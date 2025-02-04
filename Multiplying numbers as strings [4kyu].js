function multiply(num1, num2) {
    if (+num1 === 0 || +num2 === 0) return '0';
    let result = Array(num1.length + num2.length).fill(0);
  
    num1 = num1.split("").reverse().join("");
    num2 = num2.split("").reverse().join("");
  
    for (let i = 0; i < num1.length; i++) {
        for (let j = 0; j < num2.length; j++) {
            let product = (num1[i] - '0') * (num2[j] - '0');
            let sum = result[i + j] + product;
            result[i + j] = sum % 10; 
            result[i + j + 1] += Math.floor(sum / 10); 
        }
    }
  
    while (result[result.length - 1] === 0) {
        result.pop();
    }
  
    return result.reverse().join("");
}