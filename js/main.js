document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-fcfs-calculate").addEventListener("click", function () {
        const processes = parseProcesses("fcfs-arrival-time", "fcfs-burst-time");
        if (!processes) return;
        const result = fcfs(processes);
        displayResult("fcfs-result", result);
    });

    document.getElementById("btn-sjf-calculate").addEventListener("click", function () {
        const processes = parseProcesses("sjf-arrival-time", "sjf-burst-time");
        if (!processes) return;
        const nonPreemptive = document.getElementById("checkbox-sjf-non-preemptive").checked;
        const result = sjf(processes, nonPreemptive);
        displayResult("sjf-result", result);
    });

    document.getElementById("btn-priority-calculate").addEventListener("click", function () {
        const processes = parseProcesses("priority-arrival-time", "priority-burst-time", "priority-priority-level");
        if (!processes) return;
        const nonPreemptive = document.getElementById("checkbox-priority-non-preemptive").checked;
        const result = priorityScheduling(processes, nonPreemptive);
        displayResult("priority-result", result);
    });

    document.getElementById("btn-rr-calculate").addEventListener("click", function () {
        const processes = parseProcesses("rr-arrival-time", "rr-burst-time");
        if (!processes) return;
        const quantum = parseInt(document.getElementById("rr-quantum").value);
        if (isNaN(quantum) || quantum <= 0) {
            alert("Please enter a valid quantum time.");
            return;
        }
        const result = roundRobin(processes, quantum);
        displayResult("rr-result", result);
    });
});

// Display Results in HTML
function displayResult(resultId, resultData) {
    let resultContainer = document.getElementById(resultId);
    resultContainer.innerHTML = "";

    // Display execution order
    let executionDiv = document.createElement("div");
    executionDiv.innerHTML = "<h4>Execution Order:</h4><p>" + resultData.result.join("<br>") + "</p>";
    resultContainer.appendChild(executionDiv);

    // Display Gantt Chart
    let ganttDiv = document.createElement("div");
    ganttDiv.innerHTML = "<h4>Gantt Chart:</h4>";
    let ganttChart = document.createElement("div");
    ganttChart.style.display = "flex";
    ganttChart.style.border = "1px solid black";
    
    resultData.ganttChart.forEach(segment => {
        let processBlock = document.createElement("div");
        processBlock.style.border = "1px solid black";
        processBlock.style.padding = "5px";
        processBlock.style.margin = "2px";
        processBlock.style.minWidth = "40px";
        processBlock.style.textAlign = "center";
        processBlock.innerHTML = `${segment.process}<br>${segment.start} - ${segment.end}`;
        ganttChart.appendChild(processBlock);
    });

    ganttDiv.appendChild(ganttChart);
    resultContainer.appendChild(ganttDiv);

    // Display statistics
    let statsDiv = document.createElement("div");
    statsDiv.innerHTML = `
        <h4>Statistics:</h4>
        <p>Average Waiting Time: ${resultData.avgWaitingTime.toFixed(2)}</p>
        <p>Average Response Time: ${resultData.avgResponseTime.toFixed(2)}</p>
        <p>Average Turnaround Time: ${resultData.avgTurnaroundTime.toFixed(2)}</p>
    `;
    resultContainer.appendChild(statsDiv);
}
