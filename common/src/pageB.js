// import('./subPageA')
// import('./subPageB')


import * as _ from 'lodash'
let page  = 'subPageB'

if(page === 'subPageA') {

    import(/* webpackChunkName: 'subPageA' */'./subPageA').then(function (subPageA) {  
        console.log(subPageA)
    })
}else {

    import(/* webpackChunkName: 'subPageB' */'./subPageB').then(function (subPageB) {  
        console.log(subPageB)
    })
}

export default 'pageB'