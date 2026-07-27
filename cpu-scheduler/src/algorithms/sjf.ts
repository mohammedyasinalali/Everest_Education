import { Process, SimulationResult, GanttEntry, ProcessResult } from '../types';

export function sjfNonPreemptive(processes: Process[]): SimulationResult {
  const procs = processes.map(p => ({ ...p, remainingTime: p.burstTime, done: false }));
  const gantt: GanttEntry[] = [];
  const results: ProcessResult[] = [];
  let currentTime = 0;
  let completed = 0;
  const n = procs.length;

  while (completed < n) {
    const available = procs.filter(p => !p.done && p.arrivalTime <= currentTime);

    if (available.length === 0) {
      // Advance to next arrival
      const nextArrival = Math.min(...procs.filter(p => !p.done).map(p => p.arrivalTime));
      currentTime = nextArrival;
      continue;
    }

    // Pick shortest burst time; tie-break by arrival time then id
    available.sort((a, b) => {
      if (a.burstTime !== b.burstTime) return a.burstTime - b.burstTime;
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.id.localeCompare(b.id);
    });

    const chosen = available[0];
    const start = currentTime;
    const end = currentTime + chosen.burstTime;
    gantt.push({ processId: chosen.id, start, end });

    const completionTime = end;
    const turnaroundTime = completionTime - chosen.arrivalTime;
    const waitingTime = turnaroundTime - chosen.burstTime;
    results.push({ id: chosen.id, arrivalTime: chosen.arrivalTime, burstTime: chosen.burstTime, completionTime, turnaroundTime, waitingTime });

    chosen.done = true;
    currentTime = end;
    completed++;
  }

  const avgTurnaroundTime = results.reduce((s, r) => s + r.turnaroundTime, 0) / results.length;
  const avgWaitingTime = results.reduce((s, r) => s + r.waitingTime, 0) / results.length;
  return { gantt, results, avgTurnaroundTime, avgWaitingTime };
}

export function sjfPreemptive(processes: Process[]): SimulationResult {
  // SRTF - Shortest Remaining Time First
  const procs = processes.map(p => ({ ...p, remainingTime: p.burstTime, done: false, startedAt: -1, completionTime: 0 }));
  const gantt: GanttEntry[] = [];
  const n = procs.length;
  let currentTime = 0;
  let completed = 0;
  let lastProcessId: string | null = null;
  let sliceStart = 0;

  while (completed < n) {
    const available = procs.filter(p => !p.done && p.arrivalTime <= currentTime);

    if (available.length === 0) {
      const nextArrival = Math.min(...procs.filter(p => !p.done).map(p => p.arrivalTime));
      if (lastProcessId !== null) {
        gantt.push({ processId: lastProcessId, start: sliceStart, end: currentTime });
        lastProcessId = null;
      }
      currentTime = nextArrival;
      sliceStart = currentTime;
      continue;
    }

    available.sort((a, b) => {
      if (a.remainingTime !== b.remainingTime) return a.remainingTime - b.remainingTime;
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.id.localeCompare(b.id);
    });

    const chosen = available[0];

    if (chosen.id !== lastProcessId) {
      if (lastProcessId !== null) {
        gantt.push({ processId: lastProcessId, start: sliceStart, end: currentTime });
      }
      sliceStart = currentTime;
      lastProcessId = chosen.id;
    }

    chosen.remainingTime--;
    currentTime++;

    if (chosen.remainingTime === 0) {
      chosen.done = true;
      chosen.completionTime = currentTime;
      completed++;
      gantt.push({ processId: chosen.id, start: sliceStart, end: currentTime });
      lastProcessId = null;
      sliceStart = currentTime;
    }
  }

  // Merge consecutive same-process entries
  const mergedGantt: GanttEntry[] = [];
  for (const entry of gantt) {
    const last = mergedGantt[mergedGantt.length - 1];
    if (last && last.processId === entry.processId && last.end === entry.start) {
      last.end = entry.end;
    } else {
      mergedGantt.push({ ...entry });
    }
  }

  const results: ProcessResult[] = procs.map(p => {
    const turnaroundTime = p.completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    return { id: p.id, arrivalTime: p.arrivalTime, burstTime: p.burstTime, completionTime: p.completionTime, turnaroundTime, waitingTime };
  });

  const avgTurnaroundTime = results.reduce((s, r) => s + r.turnaroundTime, 0) / results.length;
  const avgWaitingTime = results.reduce((s, r) => s + r.waitingTime, 0) / results.length;
  return { gantt: mergedGantt, results, avgTurnaroundTime, avgWaitingTime };
}
