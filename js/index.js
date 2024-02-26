var yearlyChart;
var chart;
var balanceChart;
var italyChart;
var green = "#66bb6a";
var red = "#f44336";
var blue = "#3ca5ec";
var gray = "#9d9d8d";
var brown = "#b7b8ac";

function load() {
  getCountriesAnnuale();
  getCountriesTrimestre();
  getBalance();
  getStatsItaly();
  getPIL();
}

// Ricevi countries dal DB per il select dell'Annuale
async function getCountriesAnnuale() {
  let options = document.getElementById("optionsAnnuale");
  let select = document.getElementById("selectAnnuale");
  let result = await get_countries();

  for (let item of result) {
    if (item.name != "Totale") {
      let button = document.createElement("button");

      button.innerHTML = item.name;
      button.classList.add("option");
      button.onclick = () => {
        select.value = item.name;
        toggleOptionAnnuale();
        getStatsAnnuale();
      };
      options.appendChild(button);
    }

    select.value = result[0].name;
    getStatsAnnuale();
  }

}

// Cambia opzione Annuale
function toggleOptionAnnuale() {
  let options = document.getElementById("optionsAnnuale");
  let icon = document.getElementById("iconAnnuale");

  if (options.style.maxHeight != options.scrollHeight + "px") {
    options.style.maxHeight = options.scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
  } else {
    options.style.maxHeight = 0 + "px";
    icon.style.transform = "rotate(0deg)";
  }
}

// Dati statistici per trimestre
async function getStatsAnnuale() {
  let select = document.getElementById("selectAnnuale");
  let entries = [];
  let exits = [];
  let balance = [];

  let resultEntries = await get_entries_yearly(select.value)

  // Entrate
  for (item of resultEntries) {
    entries.push({ x: item.year, y: item.money });
  }

  let resultExits = await get_exits_yearly(select.value);
  // Uscite
  for (item of resultExits) {
    exits.push({ x: item.year, y: item.money });
  }

  // Saldo
  for (let i = 0; i < exits.length; i++) {
    balance.push({
      x: resultEntries[i].year,
      y: resultEntries[i].money - resultExits[i].money,
    });
  }

  // ChartTrimestre
  const ctx = document.getElementById("chartAnnuale");

  if (yearlyChart) yearlyChart.destroy();

  const tension = 0.2;
  yearlyChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          data: entries,
          tension,
          label: "Entrate",
          borderColor: green,
          backgroundColor: green,
        },
        {
          data: exits,
          tension,
          label: "Uscite",
          borderColor: red,
          backgroundColor: red,
        },
        {
          data: balance,
          tension,
          label: "Saldo",
          borderColor: blue,
          backgroundColor: blue,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "year",
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
}

// Ricevi countries dal DB per il select del Trimestre
async function getCountriesTrimestre() {
  let options = document.getElementById("optionsTrimestre");
  let select = document.getElementById("selectTrimestre");
  let result = await get_countries();

  for (let item of result) {
    let button = document.createElement("button");

    button.innerHTML = item.name;
    button.classList.add("option");
    button.onclick = () => {
      select.value = item.name;
      toggleOptionTrimestre();
      getStatsTrimestre();
    };
    options.appendChild(button);
  }

  select.value = result[0].name;
  getStatsTrimestre();
}

// Cambia opzione Trimestre
function toggleOptionTrimestre() {
  let options = document.getElementById("optionsTrimestre");
  let icon = document.getElementById("iconTrimestre");

  if (options.style.maxHeight != options.scrollHeight + "px") {
    options.style.maxHeight = options.scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
  } else {
    options.style.maxHeight = 0 + "px";
    icon.style.transform = "rotate(0deg)";
  }
}

// Dati statistici per trimestre
async function getStatsTrimestre() {
  let select = document.getElementById("selectTrimestre");
  let entries = [];
  let exits = [];
  let balance = [];
  const trimester = 90 * 24 * 60 * 60 * 1000;

  let resultEntries = await get_entries(select.value);
  // Entrate
  for (item of resultEntries) {
    item.year =
      new Date(item.year).getTime() + (item.trimester - 1) * trimester;
    entries.push({ x: item.year, y: item.money });
  }

  let resultExits = await get_exits(select.value);
  // Uscite
  for (item of resultExits) {
    item.year =
      new Date(item.year).getTime() + (item.trimester - 1) * trimester;
    exits.push({ x: item.year, y: item.money });
  }

  // Saldo
  for (let i = 0; i < exits.length; i++) {
    balance.push({
      x: resultEntries[i].year,
      y: resultEntries[i].money - resultExits[i].money,
    });
  }

  // ChartTrimestre
  const ctx = document.getElementById("chartTrimestre");

  if (chart) chart.destroy();

  const tension = 0.2;
  chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          data: entries,
          tension,
          label: "Entrate",
          borderColor: green,
          backgroundColor: green,
        },
        {
          data: exits,
          tension,
          label: "Uscite",
          borderColor: red,
          backgroundColor: red,
        },
        {
          data: balance,
          tension,
          label: "Saldo",
          borderColor: blue,
          backgroundColor: blue,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "year",
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
}

// Dati generali
async function getBalance() {
  // Saldo
  let balance = await get_total_balances();
  let countries = balance.map((item) => item.country);
  let balances = balance.map((item) => item.balance);

  // Chart
  const ctx = document.getElementById("balanceChart");
  if (balanceChart) balanceChart.destroy();

  balanceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: countries,
      datasets: [
        {
          axis: "y",
          label: "Saldo",
          data: balances,
          fill: false,
        },
      ],
    },
    options: {
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Saldi complessivi'
        }
      },
    },
  });
}

// Dati statistici per l'Italia
async function getStatsItaly() {
  let entries = [];
  let exits = [];
  let balance = [];

  let resultEntries = await get_entries_yearly("Totale");
  // Entrate
  for (item of resultEntries) {
    entries.push({ x: item.year, y: item.money });
  }

  let resultExits = await get_exits_yearly("Totale");
  // Uscite
  for (item of resultExits) {
    exits.push({ x: item.year, y: item.money });
  }

  // Saldo
  for (let i = 0; i < exits.length; i++) {
    balance.push({
      x: resultEntries[i].year,
      y: resultEntries[i].money - resultExits[i].money,
    });
  }
}

// ChartItaly
async function getStatsItaly() {
  let entries = [];
  let exits = [];
  let balance = [];

  let resultEntries = await get_entries_yearly("Totale");
  let resultExits = await get_exits_yearly("Totale");

  // Saldo
  for (let i = 0; i < resultEntries.length; i++) {
    balance.push({
      x: resultEntries[i].year,
      y: resultEntries[i].money - resultExits[i].money,
    });
  }

  // ChartItaly
  const ctx = document.getElementById("italyChart");

  if (italyChart) italyChart.destroy();

  const tension = 0.2;
  italyChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          data: balance,
          tension,
          label: "Saldo",
          borderColor: blue,
          backgroundColor: blue,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "year",
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
}

// ChartPIL
async function getPIL() {
  let entries = [];

  let resultEntries = await get_entries_yearly("Totale");

  // Entrate
  for (item of resultEntries) {
    if (item.year == "2022") {
      entries.push({ x: item.year, y: item.money });
    }
  }

  const pil = 1909154;
  let money = entries[0].y;
  let percent = (money * 100) / pil;

  console.log(percent);

  document.getElementById("pilText").innerHTML = "Il PIL nel 2022 ammonta a " + pil + " milioni di euro di cui " + money + " milioni provenienti dal turismo rappresentando il " + percent.toFixed(1) + "% sul PIL";

  var ctx = document.getElementById('PILChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Entrate Turismo' ,'PIL Rimanente'],
      datasets: [{
        label: 'Milioni di euro',
        data: [money, (pil - money)],
        backgroundColor: [
          brown,
          gray,
        ],

        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}