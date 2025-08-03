/*
    Author: Dylan Lammert

*/

function add(num1, num2) {
    var sum = 0;
    sum = num1 + num2;
    return sum;
};

function sub(num1, num2) {
    var difference = 0;
    difference = num1 - num2;
    return difference;
};

function mult(num1, num2) {
    var product = 0;
    product = num1 * num2;
    return product;
};

function div(num1, num2) {
    var dividend = 0;
    dividend = num1 / num2;
    console.log(dividend);
    return dividend;
};
function powerOf(num1,num2) {
    let answer = 0;
    answer = num1 ** num2;
    return answer;
}

function operate(operator, num1, num2) {
    let answer = 0;
    switch(operator){
        case "x":
            console.log("mult active");
            answer = mult(num1,num2);
            break;
        case "÷":
            console.log("div active");
            answer = div(num1,num2);
            break;
        case "+":
            answer = add(num1,num2);
            break;
        case "-":
            answer = sub(num1,num2);
            break;
        case "^":
            answer = powerOf(num1,num2);
            break;
        default:
            console.log("error");
    }
    return answer;
};
/**
 * 
 * @param {*} character The input that is being given by the user
 * @returns true if the operators array includes the input
 */
function isOperator(character) {
    const operators = ['+', '-', 'x', '÷','^'];
    return operators.includes(character);
};
/**
 * @brief Checks to see if a number is a percentage
 * @param {*} num number string that needs to be checked
 * @returns true if it is a percentage
 * @returns false if it is not a percentage
 */
function isPercentage(num) {
    if(num[num.length -1] == '%') {
        return true;
    }
    return false;
}
/**
 * @brief converts a percentage to decimal form
 * @param {*} numStr string version of the number that needs to be converted
 * @var decConversion - variable to hold the decimal form of the numStr
 * @returns decConversion - the decimal form of numStr
 */
function percentToDecimal(numStr) {
    let decConversion = 0;
    let num = Number(numStr.slice(0,numStr.length - 1));
    decConversion = num / 100;

    return decConversion;
}
/**
 * @brief helper function to find the index of an operator within a string
 * @var operatorIndex - the index of the operator within the string
 * @returns operatorIndex - if the operator is found
 * @returns 0 if the operator could not be found
 */
function findOperator(someString) {
    let operatorIndex = 0;
    for( let i = 0; i < someString.length; i++ ) {
        if(isOperator(someString[i])) {
            operatorIndex = i;
            return operatorIndex;
        }
    }
    return operatorIndex;
}

/**
 * @brief This function checks the currentOperation string and determines if
 *        the input that is coming in is a valid one. 
 * 
 * @param {*} currentString This is the currentOperation string
 * @param {*} input This is the input selection that is being verified
 * @returns false - 1. There are 2 operators next to each other
 *                  2. There is more than 1 decimal in a number
 *                  3. The percent sign follows an operator
 * @returns true -  1. The input does not trigger any false returns
 *                  2. The input is the second operator in the operation that doesn't directly follow another operator
 */
function verifyInput(currentString, input) {
    console.log("currentString = " + currentString);
    console.log(input);
    if(isOperator(input) && (currentString.length < 1)) {
        return false;
    }

    if(isOperator(currentString[currentString.length - 1])) {
        if(isOperator(input)){
            console.log( errorText + "Error: Cannot have 2 operators together!" + resetColor)
            return false;
        }
        else if(input == '%') {
            console.log(errorText + "Error: A percent sign cannot follow an operator" + resetColor);
            return false;
        }
    }
    for( let i = 0; i < currentString.length; i++) {
        if(isOperator(currentString[i]) && isOperator(input)) {
            console.log(warningTextBackground + blackText + "Completing operation on first operator" + resetColor);
            currentOperation += "=";
            equateButton();
            //currentOperation += input;
        }
    }
    if(input == ".") {
        console.log('input is a decimal');
        let returnValue = false;
        returnValue = decimalButton(currentString);
        return returnValue;
    }

    // check to see if the input is the % sign
    if((input == '%') && currentString.length < 1) {
        return false;
    }
    return true;
}
/**
 * @brief updates the both the displayArea and prevAnswer variables
 *        
 * @returns 0 - just a stub value.
 */
function updateDisplay() {
    displayArea.textContent = currentOperation;
    prevAnswer.textContent = lastExpression + lastAnswer;
    return 0;
}
/**
 * @brief controls the functionality for the equals button. 
 *        1. Parses the string into 3 variables 
 *        2. checks if a num is a percentage and converts it to decimal
 *        3. Do the operation 
 *        4. updates the display
 * @var num1 - left number in the operation
 * @var num1 - right number in the operation
 * @var num1Str - The string version of the number that needs to be parsed to Number
 * @var num2Str - The string version of the number that needs to be parsed to Number
 * @var spliceIndex - the index where the string will be spliced. the index of the operator.
 * @var operator - the operator for the operation
 * 
 * @returns 0 - just a stub value.
 */
function equateButton() {
    let num1 = 0;
    let num2 = 0;
    let num1Str = "";
    let num2Str = "";
    let spliceIndex = findOperator(currentOperation);
    console.log("CurrentOperation = " + currentOperation);
    // need to check if the number is a percentage first
    num1Str = currentOperation.slice(0,spliceIndex);
    if(isPercentage(num1Str)) {
        num1 = percentToDecimal(num1Str);
    }else {
        num1 = Number(num1Str)
    }

    let operator = currentOperation[spliceIndex];

    // check to see if num2 is a percentage
    num2Str = currentOperation.slice(spliceIndex + 1 , currentOperation.length - 1);
    if(isPercentage(num2Str)) {
        num2 = percentToDecimal(num2Str);
    }else {
        num2 = Number(num2Str)
    }
    // log the operation
    console.log("operate" + "(" + operator + "," + num1 + "," + num2 + ")");
    lastAnswer = operate(operator,num1,num2);
    lastExpression = currentOperation;
    currentOperation = lastAnswer;
    updateDisplay();

    return 0; 
}

function removeLastChar(someString) {
    console.log(someString);
    console.log("remove last character in the currentOperation string");
    return (someString.slice(0,someString.length - 1));
}

function decimalButton(currentString) {
    let numStr = "";
    // if there is an operator then make the splice index the operator index
    let spliceIndex = findOperator(currentString);
    console.log("inside of the decimal button function");
    numStr = currentOperation.slice(spliceIndex, currentString.length - 1);
    console.log("numStr = " + numStr);
    if(numStr.includes('.')) {
        return false;
    }

    return true;
}
// red error text color
const errorText = "\x1b[41m";
const resetColor = "\x1b[49m\x1b[39m";
const warningTextBackground = "\x1b[43m";
const blackText = "\x1b[30m";
// grab the query selector for the display area
const displayArea = document.querySelector("#displayArea");
const prevAnswer = document.querySelector("#previousAnswer")
// grab the query selector for the buttons
const buttons = document.querySelectorAll(".calculatorButtons");

// create a string to hold the current operation
let currentOperation = "";

let lastExpression = "";
let lastAnswer = "";
// add event listeners to each button so that when clicked, the button's value is added to the current operation string
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let buttonValue = e.target.textContent;
        if (verifyInput(currentOperation,buttonValue)) {
            currentOperation += buttonValue;
            displayArea.textContent = currentOperation;
        };
    });
});

// grab the reference to the clear button
const clearButton = document.querySelector("#clearButton");

clearButton.addEventListener("click", () => {
    currentOperation = "";
    displayArea.textContent = currentOperation;
});

// grab the reference to the equal sign button
const equalsButton = document.querySelector("#equalOperation");

// create an onclick event listener that 
equalsButton.addEventListener("click", equateButton);

// grab a reference to the backspace button
const backspaceButton = document.querySelector("#backSpaceButton");

backspaceButton.addEventListener("click", () => {
    currentOperation = removeLastChar(currentOperation);
    updateDisplay();
});

// grab a reference to the decimal Button
const decButton = document.querySelector("#decimalButton");
