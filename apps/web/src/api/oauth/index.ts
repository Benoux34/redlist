import { z } from "zod";
import { apiGet, apiPost } from "@/api/client";

const authorizationClient = z.object({ client_name: z.string() });
const authorizationDecision = z.object({ redirect_to: z.url() });

function authorizationRequest(
  search: string,
): Promise<z.infer<typeof authorizationClient>> {
  return apiGet(`/api/oauth/authorize${search}`, authorizationClient);
}

function authorizationDecisionRequest(
  params: Record<string, string>,
  approve: boolean,
): Promise<z.infer<typeof authorizationDecision>> {
  return apiPost("/api/oauth/authorize", authorizationDecision, {
    ...params,
    approve,
  });
}

export { authorizationRequest, authorizationDecisionRequest };
