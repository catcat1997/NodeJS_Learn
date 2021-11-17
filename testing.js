var finalres = "a";

var red = 0;
var blue = 0;

function change() {
    red += 1;
    blue += 1;
}
change();
change();
if (red >= 2 || blue >= 2) {
    finalres = '成功!';
}


console.log(finalres);