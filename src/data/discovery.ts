// Three customer-facing editions share one design and build-time copy dictionary.
export const discoveryLanguages = ['en','ja','zh'] as const;
export type DiscoveryLang = (typeof discoveryLanguages)[number];

// Owner-approved conceptual source; not a completed Chinese localization.
export const approvedChineseConcept = '从混乱的人类工作中，发现一个真正可以运行的机器工作流。';

export const discoveryMeta = {
  title: 'Eliora — AI Workflow Discovery & Build',
  description: 'Eliora observes existing work, maps automation opportunities, builds one measurable workflow, and preserves human authority through evaluation and review.',
};

export const workSignals = ['EMAIL', 'SPREADSHEET', 'SEARCH', 'COPY', 'PASTE', 'CHECK', 'WAIT', 'APPROVE', 'REWRITE', 'TRANSFER', 'SEARCH AGAIN', 'WAIT AGAIN', 'REPEAT'];
export const workflowStages = ['SIGNAL', 'MAP', 'SCORE', 'BUILD', 'PROVE', 'RUN'];
export const mapSteps = ['INQUIRY', 'EXTRACT', 'SEARCH', 'CHECK', 'DRAFT', 'APPROVE', 'SEND', 'ARCHIVE'];

export type WorkflowState = 'inactive' | 'observed' | 'active' | 'waiting' | 'blocked' | 'approved';
export interface WorkflowNode {
  id: string;
  type: 'human' | 'machine' | 'approval' | 'output';
  label: string;
  description: string;
  state: WorkflowState;
}
export const livingWorkflow: {
  nodes: WorkflowNode[];
  edges: { from: string; to: string; state: WorkflowState }[];
  metrics: { kind: 'illustrative'; beforeHours: number; afterHours: number };
} = {
  nodes: [
    { id: 'authority', type: 'human', label: 'Your decisions', description: 'You agree the task, its limits and who has the final say. Eliora documents those requirements with you.', state: 'observed' },
    { id: 'execution', type: 'machine', label: 'Automated preparation', description: 'The workflow searches, organizes and drafts within the scope you approved.', state: 'observed' },
    { id: 'gate', type: 'approval', label: 'Your review', description: 'Your designated reviewer can approve, correct or stop the prepared result before it proceeds.', state: 'waiting' },
    { id: 'output', type: 'output', label: 'Approved result', description: 'The reviewed result is ready for its agreed next step.', state: 'inactive' },
  ],
  edges: [
    { from: 'authority', to: 'execution', state: 'observed' },
    { from: 'execution', to: 'gate', state: 'waiting' },
    { from: 'gate', to: 'output', state: 'inactive' },
  ],
  metrics: { kind: 'illustrative', beforeHours: 31, afterHours: 7 },
};
