function sjf(processes, nonPreemptive) {
    let time = 0, result = [];
    let remainingProcesses = [...processes];
    
    if (nonPreemptive) {
        remainingProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);
        while (remainingProcesses.length > 0) {
            let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= time);
            if (availableProcesses.length === 0) {
                time = remainingProcesses[0].arrivalTime;
                continue;
            }
            let process = availableProcesses.reduce((min, p) => (p.burstTime < min.burstTime ? p : min));
            result.push(`${process.name} starts at ${time}, finishes at ${time + process.burstTime}`);
            time += process.burstTime;
            remainingProcesses = remainingProcesses.filter(p => p !== process);
        }
    } else {
        let executingProcess = null;
        let executingTimeLeft = 0;
        let lastStartTime = 0;
        while (remainingProcesses.length > 0) {
            let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= time);
            if (availableProcesses.length === 0 && executingProcess === null) {
                time = remainingProcesses[0].arrivalTime;
                continue;
            }
            let nextProcess = availableProcesses.reduce((min, p) => (p.burstTime < min.burstTime ? p : min), availableProcesses[0]);
            if (executingProcess !== nextProcess) {
                if (executingProcess) {
                    result.push(`${executingProcess.name} starts at ${lastStartTime}, finishes at ${time}`);
                }
                executingProcess = nextProcess;
                lastStartTime = time;
            }
            executingTimeLeft = executingProcess.burstTime;
            executingTimeLeft--;
            executingProcess.burstTime--;
            if (executingProcess.burstTime === 0) {
                remainingProcesses = remainingProcesses.filter(p => p !== executingProcess);
                result.push(`${executingProcess.name} starts at ${lastStartTime}, finishes at ${time + 1}`);
                executingProcess = null;
            }
            time++;
        }
    }
    return result;
}
