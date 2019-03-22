import 'preact'
import 'lodash'

class Hello {
  constructor (x, y) {
    console.log('HELLO WORLD!')
  }
}

let hello = new Hello()
console.log(hello)

import(/* webpackChunkName: "moduleA" */'./src/modules/moduleB.js')
import(/* webpackChunkName: "moduleA" */'./src/modules/moduleC.js')
import(/* webpackChunkName: "moduleA" */'./src/modules/moduleD.js')