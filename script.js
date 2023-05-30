
var previousAnswer = "";
var ansUsed = false;

function clearResult() {
  document.getElementById("result").value = "";
}

function deleteCharacter() {
  var result = document.getElementById("result").value;
  document.getElementById("result").value = result.slice(0, -1);
}

function appendCharacter(character) {
  
    if (character === ")") {
    document.getElementById("result").value += character;
    addClosingParenthesis();
  } else {
    document.getElementById("result").value += character;
  }
}

function calculateResult() {
  var result = document.getElementById("result").value;
  try {
    result = result.replace(/ans/g, previousAnswer).replace(/%/g, "/100");
    var answer = evalExpression(result);
    document.getElementById("result").value = answer;
    previousAnswer = answer;
    ansUsed = true;
  } catch (error) {
    document.getElementById("result").value = "Error";
  }
}

function evalExpression(expression) {
  
    expression = expression.replace(/sqrt/g, "Math.sqrt");
    var result = Function('return ' + expression)();
    return result;
  }
  

function handleKeyPress(event) {
  var key = event.key;
  var validCharacters = /[-()\d/*+.]/;

  if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteCharacter();
  } else if (validCharacters.test(key)) {
    appendCharacter(key);
  }
}

function addClosingParenthesis() {
  var result = document.getElementById("result").value;
  var openingCount = (result.match(/\(/g) || []).length;
  var closingCount = (result.match(/\)/g) || []).length;
  if (openingCount > closingCount) {
    document.getElementById("result").value += ")";
  }
}

document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("result").focus();
});

document.getElementById("result").addEventListener("input", function() {
  var result = document.getElementById("result").value;
  if (result.endsWith("Math.sqrt(") && !result.endsWith("Math.sqrt()")) {
    document.getElementById("result").value += ")";
  }
});

function handleKeyPress(event) {
    var key = event.key;
    var validCharacters = /[-()\d/*+.]/;
  
    if (key === 'Enter') {
      calculateResult();

      var equalButton = document.getElementById("equals");
      equalButton.classList.add("active");

      setTimeout(function() {
        equalButton.classList.remove("active");
      }, 100);
    } else if (key === 'Backspace') {
      deleteCharacter();
    } else if (validCharacters.test(key)) {
      appendCharacter(key);
    }

    document.getElementById("result").focus();
  }

  
  
  

  
