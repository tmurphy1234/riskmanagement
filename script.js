// Sample risk data
const risks = [
  { name: "Data Breach", type: "Cyber", division: "it", score: 15 },
  { name: "Regulatory Fine", type: "Compliance", division: "finance", score: 12 },
  { name: "Employee Turnover", type: "Operational", division: "hr", score: 8 },
  { name: "System Downtime", type: "IT", division: "it", score: 10 },
  { name: "Fraud", type: "Compliance", division: "finance", score: 6 },
];

// Populate scorecard
function updateScorecard(filter) {
  const tbody = document.getElementById("scorecardBody");
  tbody.innerHTML = "";
  risks
    .filter(r => filter === "all" || r.division === filter)
    .forEach(risk => {
      const row = `<tr>
        <td>${risk.name}</td>
        <td>${risk.type}</td>
        <td>${risk.division}</td>
        <td>${risk.score}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
}

// Chart.js Risk Type Chart
function renderChart(filter) {
  const ctx = document.getElementById("riskTypeChart");
  const filteredRisks = risks.filter(r => filter === "all" || r.division === filter);
  const types = [...new Set(filteredRisks.map(r => r.type))];
  const counts = types.map(t => filteredRisks.filter(r => r.type === t).length);

  if (window.riskChart) window.riskChart.destroy();
  window.riskChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: types,
      datasets: [{
        data: counts,
        backgroundColor: ["#e74c3c", "#f39c12", "#3498db", "#2ecc71"]
      }]
    },
    options: {
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

// Initial load
updateScorecard("all");
renderChart("all");

// Handle filter change
document.getElementById("division").addEventListener("change", (e) => {
  const value = e.target.value;
  updateScorecard(value);
  renderChart(value);
});
