// require('模塊標識符');

// 路徑形式的模塊:
// ./當前目錄  ../  上一層目錄
// /xxx   首位的 / 表示當前文件模塊所屬磁碟根路徑 /xxx 很少用到
// 絕對路徑 D:/a/foo.js 也是幾乎不用 (因為如果這文件給了別人,別人可能跑不了這個絕對路徑)

// 核心模塊的本質也是文件
// 核心模塊被編譯到了二進制文件中了, 我們只需要按照名字就可以加載
// require('fs');
// require('http');

// 第三方模塊
// 第三方模塊也是通過 包名 就可以加載了
// require('art-template');
var template = require('art-template');

console.log(template);
// ***第三方模塊加載規則***:
// 加載過程規則: node_modules/art-template/package.json文件中的main屬性
// node_modules / 包名 / package.json >>  package.json內的 main屬性
// package.json文件內: "main": "index.js",
// 之後會跑去找index.js
//
// ***如果沒有package.json 或者 package.json 中的main屬性沒有值, 
// node會自動去 node_modules/包名/  目錄下找index.js加載
// 也就是說 index.js會作為一個默認備選項

// 如果以上所有任何一個條件都不成立, 則會進入../ 上一層目錄中找node_modules查找
// 如果上一層也沒有,則會去找上上一層
// 直到當前磁碟的根目錄還找不到, 就會報錯:
// can not find module xxx

// node_modules通常放在 項目的根目錄中, 這樣項目中所有的子項目都可以加載modules
// 不會出現有多個node_modules

// 我們加載第三方包 'a' 測或上面的規則
require('a');