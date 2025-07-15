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
    return dividend;
};

function operate(operator, num1, num2) {
    switch(operator){
        case "x":
            console.log("mult active");
            mult(num1,num2);
            break;
        case "/":
            console.log("div active");
            div(num1,num2);
            break;
        case "+":
            add(num1,num2);
            break;
        case "-":
            sub(num1,num2);
            break;
        default:
            console.log("error");
    }
    return 0;
};