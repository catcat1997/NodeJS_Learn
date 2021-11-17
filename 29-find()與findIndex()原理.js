var arr = [
    { id: 1, name: 'paere' },
    { id: 2, name: 'paere2' },
    { id: 3, name: 'paere3' },
    { id: 4, name: 'paere4' }
];

Array.prototype.myFind = function(conditionFun) {
    for (let i = 0; i < this.length; i++) {
        if (conditionFun(this[i], i)) {
            return this[i];
        }

    }
}

var ret = arr.myFind(function(item) {
    return item.id === 3;
});

console.log(ret);

Array.prototype.myFindIndex = function(conditionFun) {
    for (let i = 0; i < this.length; i++) {
        if (conditionFun(this[i], i)) {
            return i;
        }
    }
}

var ret2 = arr.myFindIndex(function(item) {
    return item.id === 3;
});

console.log(ret2);