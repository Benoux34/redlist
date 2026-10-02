import { McpServer } from "@modelcontextprotocol/server";

function createRedlistServer(): McpServer {
  const server = new McpServer({ name: "redlist", version: "1.0.0" });

  server.registerTool(
    "ping",
    {
      title: "Ping",
      description: "Vérifie que le serveur MCP de Redlist répond.",
    },
    async () => ({
      content: [
        { type: "text", text: `pong (${new Date().toISOString()})` },
      ],
    }),
  );

  return server;
}

export { createRedlistServer };
