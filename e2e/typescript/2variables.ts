//make sure to compile before running ts to js
//use node filename.ts to run the code


//both type and initialized value
var employeeName:string='John';
console.log(employeeName);

//only type...string type
var employeeName1:string;   //type
employeeName='John';        //initialize

///////////////////////////////scope of variables
let y=200;  //global variable
function someFn()
{
    if(true)
    {
        var x=100;
        console.log(x);
    }
}

console.log(y);