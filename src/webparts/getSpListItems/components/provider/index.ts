import { WebPartContext } from "@microsoft/sp-webpart-base";
import pnp, { SearchQuery, SearchQueryBuilder, SearchResults, SearchResult } from '@pnp/pnpjs';

export class ProjectItemProvider {
    private context: WebPartContext;

    constructor(context: WebPartContext) {
        this.context = context;
    }

    public GetSiteItemsByContentId(contentTypeId: string, selectProperties: string[]): Promise<SearchResult[]> {
        const _searchQuerySettings: SearchQuery = {
            TrimDuplicates: false,
            RowLimit: 500, 
            SelectProperties: selectProperties.concat(["ParentLink"])
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