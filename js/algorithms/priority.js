function priorityScheduling(processes, nonPreemptive) {
    let time = 0, result = [], ganttChart = [];
    let remainingProcesses = [...processes];
    let waitingTime = {}, turnaroundTime = {};
    let firstResponse = {}, totalWaitingTime = {};
    let lastExecutionTime = {};
    
    processes.forEach(p => totalWaitingTime[p.name] = 0); // Ensure waiting time is initialized

    while (remainingProcesses.length > 0) {
        let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= time);
        if (availableProcesses.length === 0) {
            time = remainingProcesses[0].arrivalTime;
            continue;
        }

        let process;
        if (nonPreemptive) {
            process = availableProcesses.reduce((min, p) => (p.priority < min.priority ? p : min));
            console.log(`Selected process (Non-Preemptive): ${process.name}`);
            if (!(process.name in firstResponse)) {
                firstResponse[process.name] = time - process.arrivalTime;
            }
            result.push(`${process.name} (Priority ${process.priority}) starts at ${time}, finishes at ${time + process.burstTime}`);
            ganttChart.push({ process: process.name, start: time, end: time + process.burstTime });
            turnaroundTime[process.name] = time + process.burstTime - process.arrivalTime;
            waitingTime[process.name] = turnaroundTime[process.name] - process.burstTime;
            console.log(`Waiting time for ${process.name}: ${waitingTime[process.name]}`);
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
                        ganttChart.push({ process: executingProcess.name, start: lastStartTime, end: time });
                    }
                    executingProcess = nextProcess;
                    lastStartTime = time;
                }
                if (!(executingProcess.name in firstResponse)) {
                    firstResponse[executingProcess.name] = time - executingProcess.arrivalTime;
                }
                console.log(`Executing process: ${executingProcess.name} at time ${time}`);
                executingProcess.burstTime--;
                
                if (!(executingProcess.name in lastExecutionTime)) {
                    lastExecutionTime[executingProcess.name] = executingProcess.arrivalTime;
                }
                totalWaitingTime[executingProcess.name] += (time - lastExecutionTime[executingProcess.name]);
                lastExecutionTime[executingProcess.name] = time + 1;
                
                if (executingProcess.burstTime === 0) {
                    remainingProcesses = remainingProcesses.filter(p => p !== executingProcess);
                    result.push(`${executingProcess.name} (Priority ${executingProcess.priority}) starts at ${lastStartTime}, finishes at ${time + 1}`);
                    ganttChart.push({ process: executingProcess.name, start: lastStartTime, end: time + 1 });
                    turnaroundTime[executingProcess.name] = time + 1 - executingProcess.arrivalTime;
                    console.log(`Turnaround time for ${executingProcess.name}: ${turnaroundTime[executingProcess.name]}`);
                    executingProcess = null;
                }
                time++;
            }
        }
    }
    
    let avgWaitingTime = Object.values(totalWaitingTime).reduce((a, b) => a + b, 0) / Object.keys(totalWaitingTime).length;
    let avgResponseTime = Object.values(firstResponse).reduce((a, b) => a + b, 0) / Object.keys(firstResponse).length;
    let avgTurnaroundTime = Object.values(turnaroundTime).reduce((a, b) => a + b, 0) / Object.keys(turnaroundTime).length;
    
    console.log(`Average Waiting Time: ${avgWaitingTime}`);
    console.log(`Average Response Time: ${avgResponseTime}`);
    console.log(`Average Turnaround Time: ${avgTurnaroundTime}`);
    
    return { result, ganttChart, avgWaitingTime, avgResponseTime, avgTurnaroundTime };
}