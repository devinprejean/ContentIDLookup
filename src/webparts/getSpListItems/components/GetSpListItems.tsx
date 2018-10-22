import * as React from 'react';
import styles from './GetSpListItems.module.scss';
import { GetSpListItemsProps } from './GetSpListItemsProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Project, ProjectType } from './models/Project';
import { ProjectItemProvider } from './provider';

export interface GetSpListItemsState {
  listItems: Project[];
}

export class GetSpListItems extends React.Component<GetSpListItemsProps, GetSpListItemsState> {

  private provider: ProjectItemProvider;

  constructor(props: GetSpListItemsProps, context: GetSpListItemsState) {
    super(props, context);
    this.state = {
      listItems: []
    };
    this.provider = new ProjectItemProvider(this.props.webpartContext);
    this.getProjectItems();
  }

  private mapResultToProject(result: any, type: ProjectType): Project {
    const ProjectLeader: string = result.ProjectLeaderOWSUSER;

    const p: Project = {
      Title: result.Title,
      Budget: result.BudgetOWSTEXT,
      Description: result.Description1OWSTEXT,
      ProjectLeader: ProjectLeader.split('|')[1].trim(),
      Status: result.ProjectStatusOWSCHCS,
      Type: type,
      ListUrl: result.ParentLink
    };
    return p;
  }

  private getProjectItems() {
    // Get Public
    this.provider.GetSiteItemsByContentId(this.props.publicContentTypeId, this.props.projectSearchFieldStrings).then((items: Project[]) => {
      const i: Project[] = [];
      items.map((result: any) => {
        i.push(this.mapResultToProject(result, ProjectType.Public));
      });
      this.setState({
        listItems: this.state.listItems.concat(i)
      });
    });
    // Get Invited
    this.provider.GetSiteItemsByContentId(this.props.invitedContentTypeId, this.props.projectSearchFieldStrings).then((items: Project[]) => {
      const i: Project[] = [];
      items.map((result: any) => {
        i.push(this.mapResultToProject(result, ProjectType.Invited));
      });
      this.setState({
        listItems: this.state.listItems.concat(i)
      });
    });
    // Get Confidential
    this.provider.GetSiteItemsByContentId(this.props.confidentialContentTypeId, this.props.projectSearchFieldStrings).then((items: Project[]) => {
      const i: Project[] = [];
      items.map((result: any) => {
        i.push(this.mapResultToProject(result, ProjectType.Confidential));
      });
      this.setState({
        listItems: this.state.listItems.concat(i)
      });
    });
  }

  public render() {
    const { listItems } = this.state;
    return (
      <div>
        <h2>My Projects</h2>
        <table>
          <th>Title</th><th>Project Leader</th><th>Description</th><th>Status</th><th>Budget</th>
          {listItems.length > 0 && listItems.map((item: Project) => {
            if (item.ProjectLeader === this.props.webpartContext.pageContext.user.displayName)
            return (
              <tr>
                <td><a href={item.ListUrl}>{item.Title}</a></td>
                <td>{item.ProjectLeader}</td>
                <td>{item.Description}</td>
                <td>{item.Status}</td>
                <td>{item.Budget}</td>
              </tr>
            );
          })}
        </table>
        <h2>All Projects</h2>
        <table>
          <th>Title</th><th>Project Leader</th><th>Description</th>
          {listItems.length > 0 && listItems.map((item: Project) => {
            if (item.Type !== ProjectType.Confidential)
            return (
              <tr>
                <td><a href={item.ListUrl}>{item.Title}</a></td>
                <td>{item.ProjectLeader}</td>
                <td>{item.Description}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
