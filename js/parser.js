function parseProcesses(arrivalId, burstId, priorityId = null) {
    const arrivalTimes = document.getElementById(arrivalId).value.split(" ").map(n => parseInt(n.trim()));
    const burstTimes = document.getElementById(burstId).value.split(" ").map(n => parseInt(n.trim()));

    if (arrivalTimes.length !== burstTimes.length || arrivalTimes.some(isNaN) || burstTimes.some(isNaN)) {
        alert("Invalid input! Ensure arrival and burst times are correctly formatted and match in count.");
        return null;
    }

    let processes = arrivalTimes.map((arrival, index) => ({
        name: `P${index + 1}`,
        arrivalTime: arrival,
        burstTime: burstTimes[index]
    }));

    if (priorityId) {
        const priorities = document.getElementById(priorityId).value.split(" ").map(n => parseInt(n.trim()));
        if (priorities.length !== processes.length || priorities.some(isNaN)) {
            alert("Invalid priority input!");
            return null;
        }
        processes.forEach((p, i) => p.priority = priorities[i]);
    }

    return processes;
}