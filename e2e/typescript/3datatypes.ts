
//make sure you compile file first [tsc filename.ts]




//builtin data types

//number
var first:number=12.0;
var second:number=0x37CF;
var third:number=0o377;
var fourth:number=0b111;

console.log(first);

//string
var empName:string='John';
var empdept:string='IT';

console.log(empdept);
var concat1:string=empName+'works in'+empdept   //string type
console.log(concat1);

//boolean
var b:boolean=true  //boolean is type and true is value
console.log(b);


//void type
function hello():void       //function return type is voide
{
    console.log('this is welcome msg');
}

//null type.....represents a variables whose value is undefined
var num5:number=null;
num5=100;
console.log(num5);


//undefined....
var num6:number=undefined;
num6=100;
console.log(num6);


//any type.....we can store any type value num, string, boolean, null, undefined
var val:any='hi';
val=100;
console.log(val);

val=false;
console.log(val);

function myfunction(x:any, y:any)
{
    console.log(x+y);
}
myfunction(100,200);
myfunction('hi', 'welcome');