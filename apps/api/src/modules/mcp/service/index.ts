import { McpServer, type AuthInfo } from "@modelcontextprotocol/server";
import { registerTools } from "./tools";

function createRedlistServer(authInfo: AuthInfo | undefined): McpServer {
  const server = new McpServer({ name: "redlist", version: "1.0.0" });
  const userId = authInfo?.extra?.["userId"];

  registerTools(server, typeof userId === "string" ? userId : null);

  return server;
}

export { createRedlistServer };
