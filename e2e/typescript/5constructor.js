var employee = /** @class */ (function () {
    //constructot method
    function employee(id, name, deptno) {
        this.eid = id;
        this.ename = name;
        this.edeptno = deptno;
    }
    employee.prototype.display = function () {
        console.log(this.eid);
        console.log(this.ename);
        console.log(this.edeptno);
    };
    return employee;
}());
var emp = new employee(99, 'akshay', 9);
//console.log(emp);
emp.display();
