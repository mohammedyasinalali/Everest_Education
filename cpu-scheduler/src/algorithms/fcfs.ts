import { Process, SimulationResult, GanttEntry, ProcessResult } from '../types';

export function fcfs(processes: Process[]): SimulationResult {
  const sorted = [...processes].sort((a, b) => {
    if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
    return a.id.localeCompare(b.id);
  });

  const gantt: GanttEntry[] = [];
  const results: ProcessResult[] = [];
  let currentTime = 0;

  for (const p of sorted) {
    if (currentTime < p.arrivalTime) {
      currentTime = p.arrivalTime;
    }
    const start = currentTime;
    const end = currentTime + p.burstTime;
    gantt.push({ processId: p.id, start, end });

    const completionTime = end;
    const turnaroundTime = completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;

    results.push({ id: p.id, arrivalTime: p.arrivalTime, burstTime: p.burstTime, completionTime, turnaroundTime, waitingTime });
    currentTime = end;
  }

  const avgTurnaroundTime = results.reduce((s, r) => s + r.turnaroundTime, 0) / results.length;
  const avgWaitingTime = results.reduce((s, r) => s + r.waitingTime, 0) / results.length;

  return { gantt, results, avgTurnaroundTime, avgWaitingTime };
}
