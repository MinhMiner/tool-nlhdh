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
function displayResult(resultId, result) {
    document.getElementById(resultId).innerHTML = "<p>" + result.join("<br>") + "</p>";
}
