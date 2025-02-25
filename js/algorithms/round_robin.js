function roundRobin(processes, quantum) {
    let time = 0, queue = [...processes], result = [];
    while (queue.length > 0) {
        let process = queue.shift();
        let executionTime = Math.min(quantum, process.burstTime);
        let finishTime = time + executionTime;
        result.push(`${process.name} executes from ${time} to ${finishTime}`);
        process.burstTime -= executionTime;
        time = finishTime;
        if (process.burstTime > 0) queue.push(process);
    }
    return result;
}