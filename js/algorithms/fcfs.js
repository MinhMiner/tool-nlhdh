function fcfs(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0, result = [];

    processes.forEach(process => {
        let startTime = Math.max(time, process.arrivalTime);
        let finishTime = startTime + process.burstTime;
        result.push(`${process.name} starts at ${startTime}, finishes at ${finishTime}`);
        time = finishTime;
    });
    return result;
}