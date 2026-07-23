let currentInput = '0';
let previousInput = '';
let operator = null;
let memory = 0;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    currentInput = '0';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = prev / current; break;
        case '%': result = (prev * current) / 100; break;
        default: return;
    }
    currentInput = result.toString();
    operator = null;
    updateDisplay();
}

function squareRoot() {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}


function memoryPlus() {
    memory += parseFloat(currentInput);
    currentInput = '0';
}

function memoryMinus() {
    memory -= parseFloat(currentInput);
    currentInput = '0';
}

function memoryRecall() {
    currentInput = memory.toString();
    updateDisplay();
}