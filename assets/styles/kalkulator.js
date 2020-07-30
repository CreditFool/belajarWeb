const calculator = {
  displayNumber : '0',
  operator : null,
  firstNumber : null,
  waitingForSecondNumber : false
};

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearDisplay() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
  if (calculator.waitingForSecondNumber && calculator.firstNumber == calculator.displayNumber) {
    calculator.displayNumber = digit;
  }
  else {
    if (calculator.displayNumber === '0') {
      calculator.displayNumber = digit;
    }
    else {
      calculator.displayNumber += digit;
    }
  }
}

function inverseNumber() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber *= -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
  }
  else {
    alert("operator sudah ditentukan");
  }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("operator belum ada");
    return;
  }

  let result = 0;
  if (calculator.operator == '+') {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  const history = {
    firstNumber: calculator.firstNumber,
    operator: calculator.operator,
    secondNumber: calculator.displayNumber,
    result: result
  };

  putHistoryData(history);
  calculator.waitingForSecondNumber = false;
  calculator.displayNumber = result;
  renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener('click', function(event) {

    const target = event.target;

    if (target.classList.contains('clear')) {
      clearDisplay();
      updateDisplay();
      return;
    }

    if (target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
