import base from  './css/base.less'

// import common from  './css/common.less'


var app = document.getElementById('app');

app.innerHTML = '<div class="'+base.box+'"></div>'

import (/* webpackChunkName:'a' */'./component/a').then(function (a) { 
    console.log(a,'a')
})

/* let flag = false

setInterval(() => {
    if(flag) {
        base.unuse()
        
    }else {
        base.use()
        
    }
    flag = !flag
}, 500);

common.use() */