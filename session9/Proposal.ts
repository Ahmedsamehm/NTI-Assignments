export class Proposal {
  public readonly id: number;
  public readonly projectId: number;
  public readonly freelancerId: number;
  public readonly bidAmount: number;
  public readonly coverLetter: string;

  constructor(
    id: number,
    projectId: number,
    freelancerId: number,
    bidAmount: number,
    coverLetter: string
  ) {
    this.id = id;
    this.projectId = projectId;
    this.freelancerId = freelancerId;
    this.bidAmount = bidAmount;
    this.coverLetter = coverLetter;
  }
}
