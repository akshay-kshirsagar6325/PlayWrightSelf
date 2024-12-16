// we need to compile ts file first before running it [command: tsc filename.ts]
//then run using command [node filename.ts]....make sure you are in the correct file folder in the terminal before using this command
function addNumbers(a, b) {
    return a + b;
}
//invoke the function
var sum = addNumbers(10, 20); //we have stored data in sum and number is data type in this
console.log('sum of two numbers:' + sum);
