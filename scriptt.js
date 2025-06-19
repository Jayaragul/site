document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('introVideo');
  const loader = document.getElementById('video-loader');
  const main = document.getElementById('main-content');
  const hero = document.getElementById('hero');

  // Show main content after video ends
  video.onended = () => {
    loader.style.display = 'none';
    main.style.display = 'block';
    hero.scrollIntoView({ behavior: 'smooth' });
    initCharts();
  };

  // Fallback if video doesn't end
  setTimeout(() => {
    if (main.style.display === 'none') {
      loader.style.display = 'none';
      main.style.display = 'block';
      hero.scrollIntoView({ behavior: 'smooth' });
      initCharts();
    }
  }, 10000);
});

// 📊 Line Graph Initialization (myChart)
function initMyChart() {
  const ctx = document.getElementById('myChart')?.getContext('2d');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Users Gained',
        data: [100, 300, 500, 700, 900],
        borderColor: '#f39c12',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 📈 Bar Graph Initialization (carbonChart)
const carbonData = [
  { name: 'A', Refurbishment: 549, NewBuild: 278, Complete: 875, Estimate: 875 },
  { name: 'B', Refurbishment: 617, NewBuild: 506, Complete: 617, Estimate: 506 },
  { name: 'C', Refurbishment: 36, NewBuild: 185, Complete: 191, Estimate: 122 },
  { name: 'D', Refurbishment: 550, NewBuild: 881, Complete: 539, Estimate: 539 },
  { name: 'E', Refurbishment: 269, NewBuild: 29, Complete: 82, Estimate: 44 },
  { name: 'F', Refurbishment: 109, NewBuild: 106, Complete: 607, Estimate: 528 },
  { name: 'G', Refurbishment: 212, NewBuild: 145, Complete: 400, Estimate: 398 },
  { name: 'H', Refurbishment: 189, NewBuild: 92, Complete: 120, Estimate: 135 },
  { name: 'I', Refurbishment: 375, NewBuild: 315, Complete: 500, Estimate: 499 },
  { name: 'J', Refurbishment: 426, NewBuild: 350, Complete: 615, Estimate: 590 },
];

let typeFilter = 'All';
let statusFilter = 'Complete';

function getFilteredData() {
  return carbonData.map(item => ({
    label: item.name,
    value: typeFilter === 'All' ? item[statusFilter] : item[typeFilter]
  }));
}

function renderCarbonChart() {
  const ctx = document.getElementById('carbonChart')?.getContext('2d');
  if (!ctx) return;

  const filtered = getFilteredData();
  const labels = filtered.map(d => d.label);
  const values = filtered.map(d => d.value);

  if (window.carbonChart) window.carbonChart.destroy();

  window.carbonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Embodied Carbon (kgCO₂e/m²)',
        data: values,
        backgroundColor: '#7b3c3c',
        barThickness: 20
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 1200,
          ticks: { stepSize: 200 },
          grid: { drawBorder: false, color: '#eaeaea' }
        },
        x: { grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ctx.raw + ' kgCO₂e/m²'
          }
        }
      }
    }
  });
}

// 📌 Call both charts after intro
function initCharts() {
  initMyChart();
  renderCarbonChart();
}

// Filtering Functions
function setType(type) {
  typeFilter = type;
  updateFilterButtons();
  renderCarbonChart();
}

function setStatus(status) {
  statusFilter = status;
  updateFilterButtons();
  renderCarbonChart();
}

function updateFilterButtons() {
  document.querySelectorAll('.filter-group button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.filter-group').forEach(group => {
    group.querySelectorAll('button').forEach(btn => {
      const txt = btn.textContent.toLowerCase();
      if (txt === typeFilter.toLowerCase() || txt === statusFilter.toLowerCase()) {
        btn.classList.add('active');
      }
    });
  });
}
