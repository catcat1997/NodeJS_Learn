exports.add = add;

function add(x, y) {
    return x + y;
}

// 如果某個模塊需要直接導出某個成員, 而非掛載的方式
// 那就可以使用module.exports

module.exports = 'hello';
// 這種方式整個模塊只能導出一個成員

// 如果兩個module.exports 第一個會被第二個蓋走
module.exports = function minus(x, y) {
    return x - y;
}

// 也可以以對象形式導出多個module.exports
module.exports = {
    add: function(x, y) {
        return x + y;
    },
    str: 'hello',
    num: 3
};