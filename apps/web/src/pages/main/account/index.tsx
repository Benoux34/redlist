import { useAuth } from "@/context/useAuth";
import { AccountHero } from "./account-hero/AccountHero";
import { FollowedSpecies } from "./followed-species/FollowedSpecies";
import { IdentitySection } from "./identity-section/IdentitySection";
import { SecuritySection } from "./security-section/SecuritySection";
import { usePageMeta } from "@/hooks/use-page-meta/usePageMeta";

const Account = () => {
  const { user } = useAuth();

  usePageMeta({
    title: "Espace personnel",
    description: "Vos espèces suivies et les réglages de votre compte.",
    noindex: true,
  });

  if (!user) return null;

  return (
    <div className="py-8 md:py-12">
      <AccountHero pseudo={user.pseudo} />
      <FollowedSpecies />
      <IdentitySection user={user} />
      <SecuritySection user={user} />
    </div>
  );
};

export default Account;
