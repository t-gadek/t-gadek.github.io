function addNumbers() {
    const num1 = parseFloat(document.getElementById("number1").value.replace(',', '.'));
    const num2 = parseFloat(document.getElementById("number2").value.replace(',', '.'));

    if(isNaN(num1) || isNaN(num2)) {
        document.getElementById("result").innerText = "Formularz zawiera niepoprawne dane!";
    } else {
        document.getElementById("result").innerText = `${num1} + ${num2} = ${num1 + num2}`;
    }
}
