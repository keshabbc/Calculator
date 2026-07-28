let currentInput = "0";
let previousInput = "";
let operator = null;

let memory = 0;

let justCalculated = false;
let lastOperator = null;
let lastOperand = null;


const display = document.getElementById("display");
const memoryIndicator = document.getElementById("memoryIndicator");
const eModeIndicator = document.getElementById("eModeIndicator");
const errorIndicator = document.getElementById("errorIndicator");



// ===============================
// Clean number
// ===============================

function cleanNumber(value){

    let num = Number(value);


    if(!isFinite(num)){
        return "Error";
    }


    return Number(num.toPrecision(12)).toString();

}



// ===============================
// Display format
// ===============================

function formatDisplay(value){

    // Keep typing value exactly
    if(typeof value === "string" && !value.includes("e")){

        let digits = value.replace("-", "").replace(".", "");

        // Show E mode only for calculation results
        if(digits.length > 13){

            let num = Number(value);

            if(eModeIndicator){
                eModeIndicator.style.display="inline";
            }

            return num.toExponential(6);
        }


        if(eModeIndicator){
            eModeIndicator.style.display="none";
        }

        return value;

    }



    let num = Number(value);


    if(!isFinite(num)){

        return "Error";

    }


    if(
        Math.abs(num)>=1e13 ||
        (num!==0 && Math.abs(num)<1e-9)
    ){

        if(eModeIndicator){
            eModeIndicator.style.display="inline";
        }

        return num.toExponential(6);

    }


    if(eModeIndicator){
        eModeIndicator.style.display="none";
    }


    return Number(num.toPrecision(12)).toString();

}

// ===============================
// Number Input (Maximum 13 digits)
// ===============================

function appendNumber(num){

    if(currentInput === "Error"){

        currentInput = "0";

        if(errorIndicator){
            errorIndicator.style.display = "none";
        }

    }


    // After =
    if(justCalculated){

        currentInput = num;
        justCalculated = false;

        updateDisplay();
        return;

    }



    // Do not allow typing in E mode
    if(currentInput.includes("e")){

        return;

    }



    // Count only integer digits
    let integerPart = currentInput.split(".")[0];


    // Remove negative sign
    integerPart = integerPart.replace("-", "");



    // Maximum 13 digits
    if(
        num !== "." &&
        integerPart.length >= 13
    ){

        return; // ignore extra input

    }



    // Replace starting zero
    if(
        currentInput === "0" &&
        num !== "."
    ){

        currentInput = num;

    }
    else{


        // Allow only one decimal
        if(
            num === "." &&
            currentInput.includes(".")
        ){

            return;

        }


        currentInput += num;

    }


    updateDisplay();

}
// ===============================
// Clear
// ===============================

function clearDisplay(){

    currentInput="0";

    previousInput="";

    operator=null;


    lastOperator=null;

    lastOperand=null;


    justCalculated=false;


    errorIndicator.style.display="none";

    eModeIndicator.style.display="none";


    updateDisplay();

}




// ===============================
// Operator
// ===============================

function setOperator(op){


    if(currentInput==="Error"){
        return;
    }



    if(operator!==null){

        calculate();

    }



    previousInput=currentInput;

    operator=op;

    currentInput="0";


    justCalculated=false;

}




// ===============================
// Calculate
// ===============================

function calculate(){


    let prev=Number(previousInput);

    let current=Number(currentInput);


    if(isNaN(prev)||isNaN(current)){
        return;
    }



    let result;



    switch(operator){


        case "+":

            result=prev+current;

            break;



        case "-":

            result=prev-current;

            break;



        case "×":

            result=prev*current;

            break;



        case "÷":

            if(current===0){

                showError();

                return;

            }

            result=prev/current;

            break;



        case "%":

            result=(prev*current)/100;

            break;



        default:

            return;

    }



    currentInput=cleanNumber(result);



    lastOperator=operator;

    lastOperand=current;



    operator=null;

    previousInput="";


    justCalculated=true;


    updateDisplay();

}



// ===============================
// Equals
// ===============================

function equals(){


    if(currentInput==="Error"){
        return;
    }



    if(
        lastOperator!==null &&
        lastOperand!==null
    ){


        let current=Number(currentInput);

        let result;



        switch(lastOperator){


            case "+":

                result=current+lastOperand;

                break;



            case "-":

                result=current-lastOperand;

                break;



            case "×":

                result=current*lastOperand;

                break;



            case "÷":

                if(lastOperand===0){

                    showError();

                    return;

                }


                result=current/lastOperand;

                break;

        }



        currentInput=cleanNumber(result);


        updateDisplay();


    }
    else{

        calculate();

    }



    justCalculated=true;

}




// ===============================
// Square root
// ===============================

function squareRoot(){


    let value=Number(currentInput);



    if(
        isNaN(value) ||
        value<0
    ){

        showError();

        return;

    }



    currentInput=cleanNumber(
        Math.sqrt(value)
    );


    lastOperator=null;

    lastOperand=null;


    updateDisplay();

}





// ===============================
// +/-
// ===============================

function toggleSign(){


    let value=Number(currentInput);



    if(!isNaN(value)){

        currentInput=cleanNumber(
            value*-1
        );

    }


    updateDisplay();

}





// ===============================
// Memory
// ===============================

function memoryPlus(){

    let value = Number(currentInput);

    if(!isNaN(value)){

        memory += value;

        memoryIndicator.style.display="inline";

    }

    currentInput="0";

    updateDisplay();

}


function memoryMinus(){

    let value = Number(currentInput);

    if(!isNaN(value)){

        memory -= value;

        if(memory === 0){

            memoryIndicator.style.display="none";

        }

    }

    currentInput="0";

    updateDisplay();

}



function memoryRecall(){

    currentInput=cleanNumber(memory);

    updateDisplay();

}





// ===============================
// Error
// ===============================

function showError(){


    currentInput="Error";


    errorIndicator.style.display="inline";


    operator=null;

    previousInput="";


    lastOperator=null;

    lastOperand=null;


    updateDisplay();

}





// ===============================
// Update Display
// ===============================

function updateDisplay(){


    if(currentInput==="Error"){

        display.innerText="Error";

        return;

    }



    display.innerText =
        formatDisplay(currentInput);

}
function memoryClear(){

    memory = 0;

    memoryIndicator.style.display = "none";

}