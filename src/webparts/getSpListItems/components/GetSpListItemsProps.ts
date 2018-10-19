import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface GetSpListItemsProps {
  invitedContentTypeId: string;
  publicContentTypeId: string;
  confidentialContentTypeId: string;
  webpartContext: WebPartContext;
}
