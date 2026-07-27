export type AlgorithmType = 'FCFS' | 'SJF' | 'RR' | 'Priority';
export type PreemptiveMode = 'preemptive' | 'non-preemptive';

export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
}

export interface GanttEntry {
  processId: string;
  start: number;
  end: number;
}

export interface ProcessResult {
  id: string;
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
}

export interface SimulationResult {
  gantt: GanttEntry[];
  results: ProcessResult[];
  avgTurnaroundTime: number;
  avgWaitingTime: number;
}
