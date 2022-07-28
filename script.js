const bill = document.getElementById("bill");

const numberOfPeople = document.getElementById("no_of_people");

const tipInput = document.getElementById("custom-tip");

const tipContainer = document.getElementById("tip-container").children;
const tipContainerArray = Array.from(tipContainer);

let tipAmount;

const tipAmountText = document.getElementById("tipAmountText");
const tipTotalText = document.getElementById("tipTotalText");

const resetButton = document.querySelector("button");

function tipCalc(tip = 0) {
  const tipPercent = tip / 100;

  const tipAmount = +bill.value * tipPercent;
  const tipAmountPerPerson = tipAmount / +numberOfPeople.value;

  const totalAmount = (1 + tipPercent) * +bill.value;
  const totalAmountPerPerson = totalAmount / +numberOfPeople.value;

  let tipAmountpp = `$${tipAmountPerPerson.toFixed(2)}`;
  let tipTotalpp = `$${totalAmountPerPerson.toFixed(2)}`;

  if (tipAmountpp === "$NaN" || tipAmountpp === "$Infinity") {
    tipAmountpp = `${tipAmountpp}`.slice(1);
  }
  if (tipTotalpp === "$NaN" || tipTotalpp === "$Infinity") {
    tipTotalpp = `${tipTotalpp}`.slice(1);
  }

  tipAmountText.innerText = tipAmountpp;
  tipTotalText.innerText = tipTotalpp;
}

bill.addEventListener("keyup", function () {
  if (+document.getElementById("bill").value === 0) {
    if (
      bill.previousElementSibling.lastElementChild.innerText === "Can't be zero"
    ) {
      return;
    }
    bill.previousElementSibling.firstElementChild.insertAdjacentHTML(
      "afterend",
      `<span class="error">Can't be zero</span>`
    );
    bill.classList.add("input-error");
  } else if (
    +document.getElementById("bill").value !== 0 &&
    bill.previousElementSibling.lastElementChild.innerText === "Can't be zero"
  ) {
    bill.previousElementSibling.lastElementChild.remove();
    bill.classList.remove("input-error");
  }
  tipCalc(tipAmount);
  if (tipTotalText.innerText !== "$0.00") {
    resetButton.removeAttribute("disabled");
  }
});

numberOfPeople.addEventListener("keyup", function () {
  if (+document.getElementById("no_of_people").value === 0) {
    if (
      numberOfPeople.previousElementSibling.lastElementChild.innerText ===
      "Can't be zero"
    ) {
      return;
    }
    numberOfPeople.previousElementSibling.firstElementChild.insertAdjacentHTML(
      "afterend",
      `<span class="error">Can't be zero</span>`
    );
    numberOfPeople.classList.add("input-error");
  } else if (
    +document.getElementById("no_of_people").value !== 0 &&
    numberOfPeople.previousElementSibling.lastElementChild.innerText ===
      "Can't be zero"
  ) {
    numberOfPeople.previousElementSibling.lastElementChild.remove();
    numberOfPeople.classList.remove("input-error");
  }
  tipCalc(tipAmount);
  if (tipTotalText.innerText !== "$0.00") {
    resetButton.removeAttribute("disabled");
  }
});

tipContainerArray.forEach((item) => {
  item.addEventListener("click", function () {
    if (item.nodeName === "INPUT") {
      item.style.borderColor = "rgb(38, 192, 171)";
      item.style.color = "rgb(38, 192, 171)";
      for (let i of tipContainerArray) {
        if (
          i.nodeName !== "INPUT" &&
          (i.style.color !== "white" ||
            i.style.backgroundColor !== "rgb(0, 73, 77)")
        ) {
          i.style.color = "white";
          i.style.backgroundColor = "rgb(0, 73, 77)";
        }
      }
      tipAmount = +item.value;
    } else {
      item.style.color = "rgb(0, 73, 77)";
      item.style.backgroundColor = "rgb(38, 192, 171)";
      for (let i of tipContainerArray) {
        if (i.nodeName === "INPUT") {
          i.style.color = "rgb(0, 73, 77)";
          i.style.backgroundColor = "rgb(244, 248, 251)";
        } else if (
          tipContainerArray.indexOf(item) !== tipContainerArray.indexOf(i)
        ) {
          i.style.color = "white";
          i.style.backgroundColor = "rgb(0, 73, 77)";
        }
      }
      tipAmount = +item.innerText.slice(0, -1);
    }
    tipCalc(tipAmount);
    if (tipTotalText.innerText !== "$0.00") {
      resetButton.removeAttribute("disabled");
    }
  });
});

tipInput.addEventListener("keyup", function () {
  tipAmount = +document.getElementById("custom-tip").value;
  tipCalc(tipAmount);
  if (tipTotalText.innerText !== "$0.00") {
    resetButton.removeAttribute("disabled");
  }
});

resetButton.addEventListener("click", function () {
  bill.value = 0;
  for (let i of tipContainerArray) {
    if (i.nodeName !== "INPUT") {
      i.style.color = "white";
      i.style.backgroundColor = "rgb(0, 73, 77)";
    } else {
      i.style.color = "rgb(0, 73, 77)";
      i.style.backgroundColor = "rgb(244, 248, 251)";
    }
  }
  tipInput.value = "";
  numberOfPeople.value = 0;
  tipAmountText.innerText = "$0.00";
  tipTotalText.innerText = "$0.00";
  resetButton.setAttribute("disabled", true);
});
