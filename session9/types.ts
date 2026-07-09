export enum JobStatus {
  Open = "Open",
  InProgress = "InProgress",
  Review = "Review",
  Completed = "Completed"
}

// Skill type alias
export type Skill = "TypeScript" | "NodeJS" | "React" | "UI/UX";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IFreelancer extends IUser {
  skills: Skill[];
  hourlyRate: number;
}

export interface IClient extends IUser {
  budget: number;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  clientId: number;
  assignedFreelancerId?: number;
  budget: number;
  status: JobStatus;
}
