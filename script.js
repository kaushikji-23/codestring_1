const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
let currentValue = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    switch (value) {
      case 'AC':
        currentValue = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        display.textContent = currentValue;
        break;
      case '+/-':
        currentValue = (-parseFloat(currentValue)).toString();
        display.textContent = currentValue;
        break;
      case '%':
        currentValue = (parseFloat(currentValue) / 100).toString();
        display.textContent = currentValue;
        break;
      case '÷':
      case 'x':
      case '-':
      case '+':
        if (waitingForSecondOperand) {
          calculate();
        }
        operator = value;
        firstOperand = parseFloat(currentValue);
        waitingForSecondOperand = true;
        display.textContent = firstOperand + ' ' + operator;
        currentValue = '0';
        break;
      case '=':
        if (operator !== null) {
          calculate();
          operator = null;
          firstOperand = null;
          waitingForSecondOperand = false;
          display.textContent = currentValue;
        }
        break;
      case '.':
        if (!currentValue.includes('.')) {
          currentValue += '.';
          display.textContent = currentValue;
        }
        break;
      default:
        if (waitingForSecondOperand) {
          currentValue = value;
          waitingForSecondOperand = false;
          display.textContent = firstOperand + ' ' + operator + ' ' + currentValue;
        } else if (currentValue === '0') {
          currentValue = value;
          display.textContent = currentValue;
        } else {
          currentValue += value;
          display.textContent = currentValue;
        }
        break;
    }
  });
});

function calculate() {
  const secondOperand = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '÷':
      result = firstOperand / secondOperand;
      break;
    case 'x':
      result = firstOperand * secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '+':
      result = firstOperand + secondOperand;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  display.textContent = currentValue;
}