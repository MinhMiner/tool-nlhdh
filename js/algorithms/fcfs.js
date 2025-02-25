function fcfs(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0, result = [], ganttChart = [];
    let waitingTime = {}, turnaroundTime = {};
    let firstResponse = {}, totalWaitingTime = {};

    processes.forEach(p => totalWaitingTime[p.name] = 0);

    processes.forEach(process => {
        let startTime = Math.max(time, process.arrivalTime);
        let finishTime = startTime + process.burstTime;
        result.push(`${process.name} starts at ${startTime}, finishes at ${finishTime}`);
        ganttChart.push({ process: process.name, start: startTime, end: finishTime });
        turnaroundTime[process.name] = finishTime - process.arrivalTime;
        waitingTime[process.name] = turnaroundTime[process.name] - process.burstTime;
        firstResponse[process.name] = startTime - process.arrivalTime;
        totalWaitingTime[process.name] = waitingTime[process.name];
        time = finishTime;
    });

    let avgWaitingTime = Object.values(totalWaitingTime).reduce((a, b) => a + b, 0) / Object.keys(totalWaitingTime).length;
    let avgResponseTime = Object.values(firstResponse).reduce((a, b) => a + b, 0) / Object.keys(firstResponse).length;
    let avgTurnaroundTime = Object.values(turnaroundTime).reduce((a, b) => a + b, 0) / Object.keys(turnaroundTime).length;

    return { result, ganttChart, avgWaitingTime, avgResponseTime, avgTurnaroundTime };
}