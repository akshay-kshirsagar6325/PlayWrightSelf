

class employee
{
    //class variables
    eid:number
    ename:string
    edeptno:number

    //constructot method
    constructor (id:number, name:string,deptno:number)
    {
        this.eid=id;
        this.ename=name;
        this.edeptno=deptno;

    }

    display()
    {
        console.log(this.eid);
        console.log(this.ename);
        console.log(this.edeptno);
    }
}

var emp = new employee(99, 'akshay', 9)
//console.log(emp);     //we can print using the variable
emp.display();          //or we can print using the display() method