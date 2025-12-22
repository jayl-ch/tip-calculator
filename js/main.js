const option = document.querySelectorAll(".btn");
const custom = document.querySelector(".custom");
const bill = document.querySelector("[id=bill]");
const people = document.querySelector("[id=person]");
const errmsg = document.querySelector(".errormsg");
const amount = document.querySelector(".amount");
const total = document.querySelector(".total");
const reset = document.querySelector(".reset");

let tip = 0;

function removeClass(buttons) {
  buttons.forEach((b) => {
    b.classList.remove("active");
  });
}

function resetResult() {
  amount.textContent = "$0.00";
  total.textContent = "$0.00";
}

function validateInput(input) {
  if (!input.person || input.person < 1) {
    people.classList.add("error");
    errmsg.textContent = "Can't be zero";
    resetResult();
    return false;
  }
  people.classList.remove("error");
  errmsg.textContent = "";
  return true;
}

function compute() {
  const input = {
    bill: parseFloat(bill.value),
    person: person.value,
  };
  if (!validateInput(input)) return;

  let tipAmount = input.bill * tip;
  amount.textContent = `$${(tipAmount / input.person).toFixed(2)}`;
  total.textContent = `$${((input.bill + tipAmount) / input.person).toFixed(2)}`;
}

option.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeClass(option);
    e.target.classList.add("active");
    tip = e.target.id;
    compute();
  });
});

custom.addEventListener("input", () => {
  removeClass(option);
  tip = custom.value / 100;
  compute();
});

bill.addEventListener("input", compute);
people.addEventListener("input", compute);

reset.addEventListener("click", () => {
  bill.value = "";
  people.value = "";
  resetResult();
  removeClass(option);
  tip = 0;
  custom.value = "";
  errmsg.textContent = "";
  people.classList.remove("error");
});
