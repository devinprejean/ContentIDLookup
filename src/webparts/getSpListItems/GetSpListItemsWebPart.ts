import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GetSpListItemsWebPartStrings';
import { GetSpListItemsProps } from './components/GetSpListItemsProps';
import { GetSpListItems } from './components/GetSpListItems';

export interface IGetSpListItemsWebPartProps {
  invitedContentTypeId: string;
  publicContentTypeId: string;
  confidentialContentTypeId: string;
  titleSearchField: string;
  projectLeaderSearchField: string;
  descriptionSearchField: string;
  statusSearchField: string;
  budgetSearchField: string;  
}

export default class GetSpListItemsWebPart extends BaseClientSideWebPart<IGetSpListItemsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<GetSpListItemsProps> = React.createElement(
      GetSpListItems,
      {
        invitedContentTypeId: this.properties.invitedContentTypeId,
        publicContentTypeId: this.properties.publicContentTypeId,
        confidentialContentTypeId: this.properties.confidentialContentTypeId,
        projectSearchFieldStrings: [this.properties.titleSearchField, this.properties.projectLeaderSearchField, this.properties.descriptionSearchField, this.properties.statusSearchField, this.properties.budgetSearchField],
        titleSearchFieldString: this.properties.titleSearchField,
        projectLeaderSearchFieldString: this.properties.projectLeaderSearchField,
        projectStatusSearchFieldString: this.properties.statusSearchField,
        budgetSearchFieldString: this.properties.budgetSearchField,
        projectDescriptionSearchFieldString: this.properties.descriptionSearchField,
        webpartContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('publicContentTypeId', {
                  label: strings.PublicContentTypeId
                }),
                PropertyPaneTextField('invitedContentTypeId', {
                  label: strings.InvitedContentTypeId
                }),
                PropertyPaneTextField('confidentialContentTypeId', {
                  label: strings.ConfidentialContentTypeId
                }),
              ]
            },
            {
              groupName: "Search Field Names",
              groupFields: [
                PropertyPaneTextField('titleSearchField', {
                  label: "Title/Project Name"
                }),
                PropertyPaneTextField('projectLeaderSearchField', {
                  label: "Project Leader"
                }),
                PropertyPaneTextField('descriptionSearchField', {
                  label: "Description"
                }),
                PropertyPaneTextField('statusSearchField', {
                  label: "Status"
                }),
                PropertyPaneTextField('budgetSearchField', {
                  label: "Budget"
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
