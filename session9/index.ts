import { PlatformManager } from "./PlatformManager";
import { FilterEngine } from "./FilterEngine";
import { JobStatus, IFreelancer, IClient, IProject } from "./types";
import { Proposal } from "./Proposal";

console.log("=== GigLance CLI: Initialization & Verification ===");

const manager = new PlatformManager();

// --- 1. Add Freelancers ---
console.log("\n--- Registering Freelancers ---");
const freelancer1: IFreelancer = {
  id: 1,
  name: "Alice Smith",
  email: "alice@example.com",
  skills: ["TypeScript", "NodeJS"],
  hourlyRate: 50
};

const freelancer2: IFreelancer = {
  id: 2,
  name: "Bob Jones",
  email: "bob@example.com",
  skills: ["React", "UI/UX"],
  hourlyRate: 45
};

const freelancer3: IFreelancer = {
  id: 3,
  name: "Charlie Brown",
  email: "charlie@example.com",
  skills: ["TypeScript", "React"],
  hourlyRate: 60
};

manager.addFreelancer(freelancer1);
manager.addFreelancer(freelancer2);
manager.addFreelancer(freelancer3);
console.log(`Successfully registered ${manager.getFreelancers().length} freelancers.`);

// --- 2. Add Clients & Budget Validation ---
console.log("\n--- Registering Clients & Validation Check ---");
const client1: IClient = {
  id: 101,
  name: "Acme Corp",
  email: "contact@acme.com",
  budget: 5000
};

const client2: IClient = {
  id: 102,
  name: "Startup Inc",
  email: "hello@startup.io",
  budget: 1500
};

manager.addClient(client1);
manager.addClient(client2);
console.log(`Successfully registered ${manager.getClients().length} valid clients.`);

// Verification: Attempt to add client with a negative budget
console.log("Attempting to add client with negative budget (-500)...");
try {
  const invalidClient: IClient = {
    id: 103,
    name: "Scammer LLC",
    email: "scam@scammer.com",
    budget: -500
  };
  manager.addClient(invalidClient);
} catch (error: any) {
  console.log(`Expected Validation Success (Caught Error): ${error.message}`);
}

// --- 3. Add Projects ---
console.log("\n--- Creating Projects ---");
const project1: IProject = {
  id: 201,
  title: "Build Backend API",
  description: "Create a robust NestJS backend API with clean architecture.",
  clientId: 101,
  budget: 3000,
  status: JobStatus.Open
};

const project2: IProject = {
  id: 202,
  title: "Design Landing Page",
  description: "Design and implement a modern responsive landing page.",
  clientId: 102,
  budget: 1000,
  status: JobStatus.Open
};

manager.addProject(project1);
manager.addProject(project2);
console.log(`Successfully created ${manager.getProjects().length} projects.`);

// --- 4. Submit Proposals ---
console.log("\n--- Submitting Proposals ---");
const proposal1 = new Proposal(1, 201, 1, 2800, "I have 5 years of experience with TypeScript & NodeJS.");
const proposal2 = new Proposal(2, 201, 3, 3000, "Expert TypeScript and React dev ready to start.");
const proposal3 = new Proposal(3, 202, 2, 900, "High-end UI/UX and React implementation.");

manager.submitProposal(proposal1);
manager.submitProposal(proposal2);
manager.submitProposal(proposal3);
console.log(`Successfully submitted ${manager.getProposals().length} proposals.`);

// --- 5. Assign Project ---
console.log("\n--- Assigning Projects to Freelancers ---");
console.log(`Project 201 status before assignment: ${manager.getProjects().find(p => p.id === 201)?.status}`);
manager.assignProject(201, 1); // Assign "Build Backend API" to Alice
console.log(`Project 201 status after assignment to Freelancer 1: ${manager.getProjects().find(p => p.id === 201)?.status}`);
console.log(`Assigned Freelancer ID: ${manager.getProjects().find(p => p.id === 201)?.assignedFreelancerId}`);

// --- 6. Complete Project & Calculate Commission ---
console.log("\n--- Completing Projects & Platform Revenue Calculation ---");
console.log(`Initial Platform Revenue: $${PlatformManager.totalPlatformRevenue}`);
console.log(`Completing Project 201 (Budget: $3000, 10% commission expected)...`);
manager.completeProject(201);
console.log(`Project 201 status: ${manager.getProjects().find(p => p.id === 201)?.status}`);
console.log(`Lifetime Platform Revenue: $${PlatformManager.totalPlatformRevenue}`);

// --- 7. Generic Filtering (FilterEngine) ---
console.log("\n--- Filtering Entities using FilterEngine ---");
const projectFilterEngine = new FilterEngine<IProject>();
const freelancerFilterEngine = new FilterEngine<IFreelancer>();

// Filter projects by Completed status
console.log("Filtering Completed Projects:");
const completedProjects = projectFilterEngine.filterByProperty(manager.getProjects(), "status", JobStatus.Completed);
console.log(JSON.stringify(completedProjects, null, 2));

// Filter projects by Open status
console.log("Filtering Open Projects:");
const openProjects = projectFilterEngine.filterByProperty(manager.getProjects(), "status", JobStatus.Open);
console.log(JSON.stringify(openProjects, null, 2));

// Filter freelancers by hourlyRate 45
console.log("Filtering Freelancers with hourlyRate of 45:");
const rate45Freelancers = freelancerFilterEngine.filterByProperty(manager.getFreelancers(), "hourlyRate", 45);
console.log(JSON.stringify(rate45Freelancers, null, 2));

console.log("\n=== All tasks successfully completed and verified! ===");
