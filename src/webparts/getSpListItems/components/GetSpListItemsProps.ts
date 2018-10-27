import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface GetSpListItemsProps {
  invitedContentTypeId: string;
  publicContentTypeId: string;
  confidentialContentTypeId: string;
  projectSearchFieldStrings: string[];
  titleSearchFieldString: string;
  projectLeaderSearchFieldString: string;
  projectDescriptionSearchFieldString: string;
  projectStatusSearchFieldString: string;
  budgetSearchFieldString: string;
  webpartContext: WebPartContext;
}
