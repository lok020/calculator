var display = "0";

// helper function to check is the last character a numbers
function isLastDigitNumber () {
    var all_numbers_regular_expression = /[0-9]/g;
    var last_digit = display.slice(-1);
    var result = all_numbers_regular_expression.test(last_digit)
    return result;
}

// helper function to check is the last character a dot sign
function isLastDigitDot () {
    var last_digit = display.slice(-1);
    var result = last_digit == "." ? true : false;
    return result;
}

// helper function to check is the last character a percent sign
function isLastDigitPercent () {
    var last_digit = display.slice(-1);
    var result = last_digit == "%" ? true : false;
    return result;
}

// reaction from percentage button
function percentButton () {
    var numbers_array = display.split(/[÷x+-]/);
    var numbers_before_last_operator = numbers_array[numbers_array.length-1];
    if (numbers_before_last_operator != "" && !numbers_before_last_operator.includes("%"))
        display += "%";
    updateDisplay();
}

// reaction from clear button
function clearButton () {
    display = "0";
    updateDisplay();
}

// reaction from backspace button
function backspaceButton () {
    if (display.length == 1)
        display = "0";
    else
        display = display.slice(0, -1);
    updateDisplay();
}

// reaction from addition button
function additionButton () {
    if ( isLastDigitNumber() || isLastDigitPercent() )
        display += "+";
    else if ( isLastDigitDot() )
        display += "0+";
    else
        display = display.slice(0,-1) + "+";
    updateDisplay();
}

// react from subtraction button
function subtractionButton () {
    if ( isLastDigitNumber() || isLastDigitPercent() )
        display += "-";
    else if ( isLastDigitDot() )
        display += "0-";
    else
        display = display.slice(0,-1) + "-";
    updateDisplay();
}

// reaction from multiplication button
function multiplicationButton () {
    if ( isLastDigitNumber() || isLastDigitPercent() )
        display += "x";
    else if ( isLastDigitDot() )
        display += "0x";
    else
        display = display.slice(0,-1) + "x";
    updateDisplay();
}

// reacction from division button
function divisionButton () {
    if ( isLastDigitNumber() || isLastDigitPercent() )
        display += "÷";
    else if ( isLastDigitDot() )
        display += "0÷";
    else
        display = display.slice(0,-1) + "÷";
    updateDisplay();
}

// reaction from dot button
function dotButton () {
    var numbers_array = display.split(/[÷x+-]/);
    var numbers_before_last_operator = numbers_array[numbers_array.length-1];
    if (numbers_before_last_operator != "" && !numbers_before_last_operator.includes(".") && numbers_before_last_operator.slice(-1) != "%")
        display += ".";
    else if (numbers_before_last_operator == "")
        display += "0.";
    updateDisplay();
}

// reaction from equal button
function equalButton () {
    var equation = display;
    // replace ÷ by /
    equation = equation.replace("÷", "/");
    // replace x by *
    equation = equation.replace("x", "*");
    // replace percentage by multiple 100 
    var numbers_array = display.split(/[÷x+-]/);
    var numbers_array_contain_percent = numbers_array.filter(number => number.includes("%"));
    for (let i in numbers_array_contain_percent){
        var result = numbers_array_contain_percent[i];
        result = result.slice(0, -1);
        result = result * 0.01;
        equation = equation.replace(numbers_array_contain_percent[i], result);
    }
    display = eval(equation).toString();
    updateDisplay();
}

// reaction for numbers from 0 to 9
function numberButton (number) {
    if (display == "0")
        display = number;
    else if (display != "0"){
        if ( !isLastDigitPercent() )
            display += number;
    }
    updateDisplay();
}

// update the calcutor display
function updateDisplay () {
    document.getElementById("display").value = display;
}