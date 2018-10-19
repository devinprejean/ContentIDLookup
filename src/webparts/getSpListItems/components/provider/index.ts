import { WebPartContext } from "@microsoft/sp-webpart-base";
import pnp, { SearchQuery, SearchQueryBuilder, SearchResults, SearchResult } from '@pnp/pnpjs';

export class ProjectItemProvider {
    private context: WebPartContext;

    constructor(context: WebPartContext) {
        this.context = context;
    }

    public GetSiteItemsByContentId(contentTypeId: string): Promise<SearchResult[]> {
        const _searchQuerySettings: SearchQuery = {
            TrimDuplicates: false,
            RowLimit: 500, 
            SelectProperties:["Title", "Description1OWSTEXT", "ProjectLeaderOWSUSER", "ProjectStatusOWSCHCS", "BudgetOWSTEXT", "ParentLink"]
        };
        
        let q = SearchQueryBuilder(`ContentTypeId:${contentTypeId}*`, _searchQuerySettings).rowLimit(500);
        const srPromise = new Promise<SearchResult[]>((resolve, reject) => {
            pnp.sp.search(q).then((response: SearchResults) => {

                resolve(response.PrimarySearchResults);
            });
        });
        return srPromise;
    }
}