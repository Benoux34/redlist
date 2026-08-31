# Liste Rouge

Consultation des espèces menacées d'après la Liste Rouge de l'UICN.

- `apps/api` — API Hono + Prisma (Bun), sert `/api/*`
- `apps/web` — SPA React + Vite
- `packages/contracts` — schémas Zod partagés entre le front et l'API
- `tests` — tests unitaires (`bun test`)

## Développement

```bash
bun install
bun run db:up   # Postgres local sur 127.0.0.1:5433
```

Les fichiers d'environnement ne sont pas versionnés. Les créer à la main :

```bash
cat > apps/api/.env <<EOF
NODE_ENV=development
DATABASE_URL=postgresql://ben:ben_free@127.0.0.1:5433/befree
WEB_ORIGIN=http://127.0.0.1:5173
TRUST_PROXY=false
IUCN_API_TOKEN=
IUCN_API_BASE_URL=https://api.iucnredlist.org/api/v4
IUCN_CONTACT_EMAIL=
EOF

# Dev uniquement : Vite (5173) et l'API (3000) sont sur deux origines.
# Ne jamais créer apps/web/.env — Vite le charge aussi en production, ce qui
# figerait une URL de dev dans le bundle. Le suffixe .development l'évite.
echo 'VITE_API_URL="http://127.0.0.1:3000"' > apps/web/.env.development
```

```bash
cd apps/api && bun run db:migrate && bun run dev
cd apps/web && bun run dev
```

En production les deux partagent la même origine : `VITE_API_URL` n'est pas
défini et le front appelle `/api` en relatif.

### Ingestion des données

Les scripts sont manuels et reprennent là où ils s'arrêtent :

```bash
cd apps/api
bun src/ingestion/seed.ts            # assessments UICN
bun run redlist:enrich               # photos, descriptions
bun src/ingestion/enrich-taxonomy.ts # taxonomie GBIF
bun src/ingestion/seed-locations.ts  # répartition par pays
```

## Déploiement (VPS)

L'architecture est **mono-origine** : nginx sert la SPA et proxifie `/api` vers
l'API. Ce n'est pas un détail de confort — le cookie de session est en
`SameSite=Lax`, et un `fetch` cross-site ne l'emporterait tout simplement pas.
Servir l'API sur un autre domaine casserait l'authentification en production
alors qu'elle fonctionne en local.

```
Internet → nginx (hôte, TLS) → :8080 nginx (conteneur web) → api:3000 → db:5432
```

### 1. Prérequis sur le VPS

```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
# + Docker Engine et le plugin compose
```

### 2. Configuration

Les secrets ne sont pas versionnés — il n'y a volontairement pas de fichier
d'exemple dans ce dépôt public. Créer `.env.prod` à la main à la racine :

```bash
git clone <repo> redlist && cd redlist

cat > .env.prod <<EOF
POSTGRES_USER=redlist
POSTGRES_DB=redlist
POSTGRES_PASSWORD=$(openssl rand -base64 32)
WEB_ORIGIN=https://example.com
IUCN_API_TOKEN=
IUCN_API_BASE_URL=https://api.iucnredlist.org/api/v4
IUCN_CONTACT_EMAIL=
EOF

chmod 600 .env.prod
$EDITOR .env.prod          # renseigner WEB_ORIGIN et les valeurs IUCN
```

`WEB_ORIGIN` doit être en `https://` : l'API refuse de démarrer sinon, parce que
le cookie de session est émis avec le flag `Secure`.

### 3. Démarrage

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
curl -f http://127.0.0.1:8080/health
```

Les migrations sont appliquées automatiquement au démarrage du conteneur `api`
(`prisma migrate deploy`, idempotent).

### 4. TLS

```bash
sudo cp deploy/nginx-host.conf.example /etc/nginx/sites-available/redlist
sudo $EDITOR /etc/nginx/sites-available/redlist   # remplacer example.com
sudo ln -s /etc/nginx/sites-available/redlist /etc/nginx/sites-enabled/
sudo certbot --nginx -d example.com -d www.example.com
sudo nginx -t && sudo systemctl reload nginx
```

### Mise à jour

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## Sécurité — points de configuration

Quelques garde-fous dépendent de la configuration et pas seulement du code :

| Point | Où | Conséquence si mal configuré |
|---|---|---|
| `NODE_ENV=production` | `docker-compose.prod.yml` | Cookie de session émis sans `Secure` |
| `WEB_ORIGIN` en https | `.env.prod` | Démarrage refusé (garde-fou volontaire) |
| `TRUST_PROXY=true` | `docker-compose.prod.yml` | À n'activer **que** derrière le proxy : sinon un client peut forger `X-Real-IP` et contourner le rate limiting |
| `X-Real-IP` réécrit | `deploy/nginx*.conf` | Rate limiting keyé sur une valeur contrôlée par le client |
| CSP | `deploy/security-headers.conf` | `img-src` est volontairement large (photos et tuiles tierces) |

Le rate limiting est en mémoire : il repart de zéro à chaque redémarrage et ne
se partage pas entre plusieurs instances. C'est suffisant pour un déploiement
mono-conteneur, à revoir si l'API est répliquée.

## Exploitation

```bash
docker compose -f docker-compose.prod.yml logs -f api
docker compose -f docker-compose.prod.yml exec db pg_dump -U redlist redlist > backup.sql
```

Les sessions expirées sont purgées automatiquement par l'API (au démarrage puis
toutes les heures).
