function priorityScheduling(processes, nonPreemptive) {
    let time = 0, result = [];
    let remainingProcesses = [...processes];
    
    while (remainingProcesses.length > 0) {
        let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= time);
        if (availableProcesses.length === 0) {
            time = remainingProcesses[0].arrivalTime;
            continue;
        }

        let process;
        if (nonPreemptive) {
            process = availableProcesses.reduce((min, p) => (p.priority < min.priority ? p : min));
            result.push(`${process.name} (Priority ${process.priority}) starts at ${time}, finishes at ${time + process.burstTime}`);
            time += process.burstTime;
            remainingProcesses = remainingProcesses.filter(p => p !== process);
        } else {
            let executingProcess = null;
            let lastStartTime = time;
            while (remainingProcesses.length > 0) {
                availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= time);
                if (availableProcesses.length === 0) {
                    time = remainingProcesses[0].arrivalTime;
                    continue;
                }
                let nextProcess = availableProcesses.reduce((min, p) => (p.priority < min.priority ? p : min), availableProcesses[0]);
                if (executingProcess !== nextProcess) {
                    if (executingProcess) {
                        result.push(`${executingProcess.name} (Priority ${executingProcess.priority}) starts at ${lastStartTime}, finishes at ${time}`);
                    }
                    executingProcess = nextProcess;
                    lastStartTime = time;
                }
                executingProcess.burstTime--;
                if (executingProcess.burstTime === 0) {
                    remainingProcesses = remainingProcesses.filter(p => p !== executingProcess);
                    result.push(`${executingProcess.name} (Priority ${executingProcess.priority}) starts at ${lastStartTime}, finishes at ${time + 1}`);
                    executingProcess = null;
                }
                time++;
            }
        }
    }
    return result;
}
