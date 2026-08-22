function addNumbers() {
    const num1 = parseInt(document.getElementById("number1").value);
    const num2 = parseInt(document.getElementById("number2").value);

    document.getElementById("a").innerText = num1;
    document.getElementById("b").innerText = num2;
    document.getElementById("sign").innerText = "+";
    document.getElementById("=").innerText = "=";

    if (num1 < 0 || num2 < 0) {                
        document.getElementById("result").innerText = 0;
    } else {
        const sum = num1 + num2;
        
        document.getElementById("result").innerText = sum;
    }
}
