export type MemoType = 'quick' | 'project' | 'initiative';

export type TeamMember = {
  person: string;
  role: string;
  hours: string;
  when: string;
  confirmed: boolean;
};

export type QuickMemoData = {
  submittedBy: string;
  date: string;
  category: string;
  priorityLevel: string;
  companyPriority: string[];
  deadline: string;
  teamMembers: TeamMember[];
  approver: string;
  informed: string;
  idea: string;
  whyNowTrigger: string;
  whyNowCost: string;
  expectedOutcome: string;
  successMetric: string;
  budget: string;
  toolsNeeded: string;
  missionAlignment: string;
};

export type ProjectMemoData = {
  projectName: string;
  submittedBy: string;
  date: string;
  projectType: string;
  priorityLevel: string;
  companyPriority: string[];
  targetLaunchDate: string;
  hardDeadline: string;
  teamMembers: TeamMember[];
  responsible: string;
  accountable: string;
  consulted: string;
  informed: string;
  approver: string;
  problem: string;
  problemCost: string;
  proposal: string;
  proposalOutcome: string;
  proofPast: string;
  proofExternal: string;
  targetAudience: string;
  avatars: string[];
  promotionChannels: string[];
  contentNeeded: string;
  preFrameStrategy: string;
  trafficNeeded: string;
  currentReach: string;
  offerDescription: string;
  pricePoint: string;
  offerName: string;
  whyBuyNow: string;
  objections: { objection: string; response: string }[];
  salesMechanism: string[];
  whoSells: string;
  conversionTarget: string;
  budgetRequired: string;
  externalResources: string;
  capacityCheck: string;
  deprioritize: string;
  dependencies: string;
  deliveryPlan: string;
  qualityControl: string;
  missionAlignment: string[];
  missionJustification: string;
  risks: { risk: string; mitigation: string }[];
  killSwitch: string;
  primaryMetric: string;
  secondaryMetrics: string;
  reviewDate: string;
};

export type InitiativeMemoData = ProjectMemoData & {
  initiativeType: string;
  phase2031: string[];
  executiveSummaryOpportunity: string;
  executiveSummaryProposal: string;
  executiveSummaryAsk: string;
  investmentRequired: string;
  expectedReturn: string;
  currentState: string;
  marketContext: string;
  competitiveLandscape: string;
  rootCause: string;
  costOfInaction: string;
  detailedProposal: string;
  whyThisApproach: string;
  alternatives: { option: string; reason: string }[];
  evidence: string;
  tested: string;
  externalExamples: string;
  milestones: { date: string; milestone: string; criteria: string; owner: string }[];
  budgetBreakdown: { item: string; oneTime: string; monthly: string }[];
  dependencyList: { dependency: string }[];
  blockers: string;
  riskMatrix: { risk: string; likelihood: string; impact: string; mitigation: string }[];
  worstCase: string;
  reversible: string;
  exitStrategy: string;
  roiInvestment: string;
  roiReturn: string;
  paybackPeriod: string;
  reviewSchedule: { checkpoint: string; review: string }[];
};

export const priorityLevels = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

export const companyPriorities = [
  'Revenue Growth',
  'Client Delivery',
  'Brand Building',
  'Team & Operations',
  'Strategic Expansion',
  'Infrastructure',
];

export const projectTypes = ['Campaign', 'Offer', 'System', 'Content', 'Other'];

export const initiativeTypes = ['Launch', 'Hire', 'Investment', 'Partnership', 'Strategic Pivot'];

export const avatars = [
  'Avatar 1: Ambitious Tuition Center Owner',
  'Avatar 2: Career-Switching Coach/Consultant',
  'Avatar 3: Struggling Service-Based Business Owner',
];

export const promotionChannels = [
  'Organic content (IG/TikTok/YouTube)',
  'Paid ads (Meta/Google)',
  'Email list',
  'Partner/affiliate promotion',
  'In-person events',
];

export const salesMechanisms = [
  'Direct purchase (landing page)',
  'Application / booking call',
  'Webinar / live event',
  'In-person sales',
];

export const missionChecks = [
  'Moves us toward world-renowned status',
  'Honors "Peaceful and Profitable" culture',
  'Works globally (not just Singapore)',
  'Respects our people (no burnout required)',
  'Meets world-class quality standards',
];

export const phases2031 = [
  'Phase 1: Dominate Asia Pacific (2025-2027) - CURRENT',
  'Phase 2: Expand West (2027-2029)',
  'Phase 3: Complete Global Footprint (2029-2031)',
  'Foundational - supports all phases',
];

export const capacityOptions = [
  'Yes - team has bandwidth',
  'Partial - need to deprioritize something else',
  'No - need additional resources',
];

export const missionAlignmentOptions = [
  'Yes - moves us toward world-renowned status',
  'Maybe - tangentially related',
  'No - but still valuable because:',
];
