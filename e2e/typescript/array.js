var array1 = ['apple', 'samsung', 'xiomi', 'oneplus'];
console.log(array1[0]);
/////////////////////////////////////// 2d multi tray array
var array2 = [[10, 'abd'], [20, 'ebc']];
console.log(array2[0][0]);
console.log(array2[0][1]);
console.log(array2[1][0]);
console.log(array2[1][1]);
////////////////////////////////////// for loop to access array elements
console.log('reading array elements using the for loop.............');
for (var i = 0; i < array2.length; i++) {
    for (var j = 0; j < array2.length; j++) {
        console.log(array2[i][j]);
    }
}
////////////////////////////////////// in loop to access array elements
console.log('reading array elements using the in loop.............');
for (var a in array2) {
    for (var e in array2[a]) {
        console.log(array2[a][e]);
    }
}
///////////////////////////////// tuple array
var student;
student = [['akshay', 10], ['akshay1', 99]];
console.log(student[0]);
console.log(student[1]);
console.log(student[2]);
