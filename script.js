const chartArea = document.getElementById("chart_area_main");
const data = [
  {
    day: "mon",
    amount: 17.45,
  },
  {
    day: "tue",
    amount: 34.91,
  },
  {
    day: "wed",
    amount: 52.36,
  },
  {
    day: "thu",
    amount: 31.07,
  },
  {
    day: "fri",
    amount: 23.39,
  },
  {
    day: "sat",
    amount: 43.28,
  },
  {
    day: "sun",
    amount: 25.48,
  },
];

function findMax(dataArray) {
  let maxNumber = -Infinity;
  for (let i of dataArray) {
    if (i.amount > maxNumber) {
      maxNumber = i.amount;
    }
  }
  return maxNumber;
}

function heightPercent(dataArray) {
  dataArray.map((i, index) => {
    let newHeight = Math.floor((i.amount / findMax(dataArray)) * 100);
    chartArea.children[
      index
    ].children[0].children[0].style.height = `${newHeight}%`;
    if (i.amount === findMax(dataArray)) {
      chartArea.children[index].children[0].children[0].style.backgroundColor =
        "hsl(186, 34%, 60%)";
    }
  });
}

heightPercent(data);

function openToolTip(id) {
  let tooltipPopup = document.getElementById(id);
  data.map((i) => {
    if (i.day === id) {
      tooltipPopup.innerText = `$${i.amount}`;
      tooltipPopup.style.top =
        +tooltipPopup.parentElement.style.height.slice(0, -1) + 20 + "px";
      tooltipPopup.style.left =
        +tooltipPopup.parentElement.style.width.slice(0, -1) + 5 + "px";
    }
  });
  tooltipPopup.classList.toggle("show"); // toggle the tooltip
}
