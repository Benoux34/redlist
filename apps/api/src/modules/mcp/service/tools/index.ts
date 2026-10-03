import type { McpServer } from "@modelcontextprotocol/server";
import { env } from "@/lib/env";
import { listFavorites } from "@/modules/favorite/service";
import { NOT_AUTHENTICATED, formatFollowedSpecies } from "./utils";

function registerTools(server: McpServer, userId: string | null): void {
  server.registerTool(
    "ping",
    {
      title: "Ping",
      description: "Checks that the Redlist MCP server is up.",
    },
    async () => ({
      content: [{ type: "text", text: `pong (${new Date().toISOString()})` }],
    }),
  );

  server.registerTool(
    "get_followed_species",
    {
      title: "Followed species",
      description:
        "Lists the species the user follows on Redlist (their favorites): name, current IUCN Red List status, date they started following it and a link to its page. Flags species whose status changed since then.",
      annotations: { readOnlyHint: true },
    },
    async () => {
      if (userId === null)
        return {
          isError: true,
          content: [{ type: "text", text: NOT_AUTHENTICATED }],
        };

      const favorites = await listFavorites(userId);

      return {
        content: [
          {
            type: "text",
            text: formatFollowedSpecies(favorites, env.WEB_ORIGIN),
          },
        ],
      };
    },
  );
}

export { registerTools };
