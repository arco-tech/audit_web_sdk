import {request} from "./API";

interface PublicHelpRequestParams {
  email: string;
}

interface PublicHelpRequestData {
  id: number;
  inserted_at: string;
}

export function create(
  params: PublicHelpRequestParams,
): Promise<PublicHelpRequestData> {
  return request<PublicHelpRequestData>("post", "public-help-requests", {
    body: {public_help_request: params},
  });
}
