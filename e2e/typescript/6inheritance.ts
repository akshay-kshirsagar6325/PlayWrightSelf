


class Person
{
    name:string

    constructor(name:string)
    {
        this.name=name;
    }
}

class Employee extends Person
{
    empno:number;

    constructor(empno:number, name:string)
    {
        super(name);
        this.empno=empno;
    }

    display()
    {
        console.log(this.empno, this.name);
    }
}

var obj1 = new Employee(10, 'Ak')
obj1.display();