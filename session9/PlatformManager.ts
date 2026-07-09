import { IFreelancer, IClient, IProject, JobStatus } from "./types";
import { Proposal } from "./Proposal";

export class PlatformManager {
  private freelancers: IFreelancer[] = [];
  private clients: IClient[] = [];
  private projects: IProject[] = [];
  private proposals: Proposal[] = [];

  // Static property to track system's lifetime earnings
  public static totalPlatformRevenue: number = 0;

  // Validation & Adding Freelancers
  public addFreelancer(freelancer: IFreelancer): void {
    if (this.freelancers.some(f => f.id === freelancer.id)) {
      throw new Error(`Freelancer with ID ${freelancer.id} already exists.`);
    }
    this.freelancers.push(freelancer);
  }

  // Validation & Adding Clients (Ensures budget is not negative)
  public addClient(client: IClient): void {
    if (client.budget < 0) {
      throw new Error(`Invalid Client: Client '${client.name}' cannot have a negative budget (${client.budget}).`);
    }
    if (this.clients.some(c => c.id === client.id)) {
      throw new Error(`Client with ID ${client.id} already exists.`);
    }
    this.clients.push(client);
  }

  // Validation & Adding Projects
  public addProject(project: IProject): void {
    if (this.projects.some(p => p.id === project.id)) {
      throw new Error(`Project with ID ${project.id} already exists.`);
    }
    // Check if client exists
    if (!this.clients.some(c => c.id === project.clientId)) {
      throw new Error(`Client with ID ${project.clientId} does not exist.`);
    }
    this.projects.push(project);
  }

  // Submit a proposal
  public submitProposal(proposal: Proposal): void {
    // Check if project exists
    const project = this.projects.find(p => p.id === proposal.projectId);
    if (!project) {
      throw new Error(`Project with ID ${proposal.projectId} does not exist.`);
    }
    // Check if project is open for proposals
    if (project.status !== JobStatus.Open) {
      throw new Error(`Project with ID ${proposal.projectId} is not open for proposals.`);
    }
    // Check if freelancer exists
    if (!this.freelancers.some(f => f.id === proposal.freelancerId)) {
      throw new Error(`Freelancer with ID ${proposal.freelancerId} does not exist.`);
    }
    this.proposals.push(proposal);
  }

  // Assign a project to a freelancer
  public assignProject(projectId: number, freelancerId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error(`Project with ID ${projectId} does not exist.`);
    }
    
    const freelancer = this.freelancers.find(f => f.id === freelancerId);
    if (!freelancer) {
      throw new Error(`Freelancer with ID ${freelancerId} does not exist.`);
    }

    project.assignedFreelancerId = freelancerId;
    project.status = JobStatus.InProgress;
  }

  // Complete a project & calculate 10% commission
  public completeProject(projectId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error(`Project with ID ${projectId} does not exist.`);
    }

    if (project.status !== JobStatus.InProgress) {
      throw new Error(`Project with ID ${projectId} is not currently InProgress (Current status: ${project.status}).`);
    }

    project.status = JobStatus.Completed;

    // 10% commission added to the static platform revenue
    const commission = project.budget * 0.10;
    PlatformManager.totalPlatformRevenue += commission;
  }

  // Getters for private arrays (to allow display / filtering)
  public getFreelancers(): IFreelancer[] {
    return [...this.freelancers];
  }

  public getClients(): IClient[] {
    return [...this.clients];
  }

  public getProjects(): IProject[] {
    return [...this.projects];
  }

  public getProposals(): Proposal[] {
    return [...this.proposals];
  }
}
