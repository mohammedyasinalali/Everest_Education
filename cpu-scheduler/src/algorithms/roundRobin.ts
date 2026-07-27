import { Process, SimulationResult, GanttEntry, ProcessResult } from '../types';

export function roundRobin(processes: Process[], quantum: number): SimulationResult {
  const procs = processes
    .map(p => ({ ...p, remainingTime: p.burstTime, completionTime: 0 }))
    .sort((a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id));

  const gantt: GanttEntry[] = [];
  const queue: typeof procs = [];
  let currentTime = 0;
  let idx = 0; // index into sorted procs for arrivals

  // Add all processes arriving at time 0
  while (idx < procs.length && procs[idx].arrivalTime <= currentTime) {
    queue.push(procs[idx++]);
  }

  while (queue.length > 0) {
    const current = queue.shift()!;
    const start = currentTime;
    const execTime = Math.min(quantum, current.remainingTime);
    currentTime += execTime;
    current.remainingTime -= execTime;

    // Add newly arrived processes
    while (idx < procs.length && procs[idx].arrivalTime <= currentTime) {
      queue.push(procs[idx++]);
    }

    if (current.remainingTime > 0) {
      queue.push(current);
    } else {
      current.completionTime = currentTime;
    }

    // Merge with last gantt entry if same process
    const lastEntry = gantt[gantt.length - 1];
    if (lastEntry && lastEntry.processId === current.id && lastEntry.end === start) {
      lastEntry.end = currentTime;
    } else {
      gantt.push({ processId: current.id, start, end: currentTime });
    }

    // If queue is empty but there are still unqueued processes, advance time
    if (queue.length === 0 && idx < procs.length) {
      currentTime = procs[idx].arrivalTime;
      while (idx < procs.length && procs[idx].arrivalTime <= currentTime) {
        queue.push(procs[idx++]);
      }
    }
  }

  const results: ProcessResult[] = procs.map(p => {
    const turnaroundTime = p.completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    return { id: p.id, arrivalTime: p.arrivalTime, burstTime: p.burstTime, completionTime: p.completionTime, turnaroundTime, waitingTime };
  });

  const avgTurnaroundTime = results.reduce((s, r) => s + r.turnaroundTime, 0) / results.length;
  const avgWaitingTime = results.reduce((s, r) => s + r.waitingTime, 0) / results.length;
  return { gantt, results, avgTurnaroundTime, avgWaitingTime };
}
