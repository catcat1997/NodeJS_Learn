// 如果需要獲取一個函數中異步操作的結果, 則必須通過 **回調函數** 來獲取

function fn(callback) {
    setTimeout(function() {
        var data = '100';
        callback(data);
    }, 1000);
};


// 回調函數: 需要時再調用的函數(異步任務內調用,就可以取得異步數據,也是個閉包)
fn(function(data) {
    console.log(data);
});