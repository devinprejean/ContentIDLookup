export interface Project {
    Title: string;
    ProjectLeader: string;
    Description: string;
    Status: ProjectStatus;
    Budget: string;
    Type: ProjectType;
    ListUrl: string;
  }

  export enum ProjectStatus {
    New = "New",
    Finished = "Finished",
    OnTime = "On Time",
    OverBudget = "Over Budget"
  }
  
  export enum ProjectType {
    Public = "Public",
    Invited= "Invited",
    Confidential = "Confidential"
  }