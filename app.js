// selectors

const bill = document.getElementById("bill");
const billPercentage = document.querySelectorAll(".active");
const customInput = document.getElementById("customInput");
const noOfPeople = document.getElementById("no-of-people");
const warningMsg = document.getElementById("warningMsg");
const totalTip = document.getElementById("total-tip");
const totalAmount = document.querySelectorAll(".total-amount");
const resetBtn = document.getElementById("reset");

// event listener

bill.addEventListener("input", getBillAmount);
billPercentage.forEach((tipBtn) => {
  tipBtn.addEventListener("click", getBillPercentage);
});
customInput.addEventListener("input", customValue);
noOfPeople.addEventListener("input", getNoOfPeople);
resetBtn.addEventListener("click", resetButton);

// default value
let billValue = 0.0;
let tipValue = 0.15; // tip percentage divided 100
let people = 1;

// validators function

function validate(s) {
  const rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}
function validateInt(s) {
  const rgx = /^[0-9]*$/;
  return s.match(rgx);
}

//get bill amount function

function getBillAmount() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }
  if (!validate(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);
  calculateTotal();
}

// get bill percentage btn function

function getBillPercentage(event) {
  // clear active state
  billPercentage.forEach((tipBtn) => {
    tipBtn.classList.remove("active-now");

    // set current active state

    if (event.target.innerHTML == tipBtn.innerHTML) {
      tipBtn.classList.add("active-now");

      tipValue = parseFloat(tipBtn.innerHTML) / 100;
    }
    calculateTotal();
  });
}

// custom bill amount function

function customValue() {
  if (customInput.value.includes(",")) {
    customInput.value = customInput.value.replace(",", ".");
  }
  if (!validateInt(customInput.value)) {
    customInput.value = customInput.value.substring(
      0,
      customInput.value.length - 1
    );
  }
  tipValue = parseFloat(customInput.value) / 100;
  billPercentage.forEach((tipBtn) => {
    tipBtn.classList.remove("active-now");
  });

  if (customInput.value !== "") {
    calculateTotal();
  }
}

// getNoOfPeople function

function getNoOfPeople() {
  if (!validateInt(noOfPeople.value)) {
    noOfPeople.value = noOfPeople.value.substring(
      0,
      noOfPeople.value.length - 1
    );
  }

  if (noOfPeople.value <= 0) {
    warningMsg.style.opacity = 1;
    setTimeout(() => {
      warningMsg.style.opacity = 0;
    }, 3000);
    noOfPeople.value = 1;
  }

  people = parseFloat(noOfPeople.value);

  calculateTotal();
}

// calculate total function

function calculateTotal() {
  let tipAmount = (billValue * tipValue) / people;
  let total = (billValue * (tipValue + 1)) / people;

  if (isNaN(tipAmount) || isNaN(total)) {
    totalAmount[0].childNodes[3].innerHTML = `$${0.0}`;
    totalAmount[1].childNodes[3].innerHTML = `$${0.0}`;
  } else {
    totalAmount[0].childNodes[3].innerHTML = `$${tipAmount.toFixed(2)}`;
    totalAmount[1].childNodes[3].innerHTML = `$${total.toFixed(2)}`;
  }
}

// reset button function

function resetButton() {
  bill.value = "0.00";
  getBillAmount();
  billPercentage[0].click();
  noOfPeople.value = "1";
  getNoOfPeople();
}
