const fs = require('fs')
const path = require('path')
const robot = require("robotjs")
const result = fs.readdirSync('./image/')
result.map(v => __dirname + '/' + v)
console.log(result);


function doing (){
  robot.moveMouse(26,76)
  robot.mouseClick()

  robot.keyTap('o')
  robot.typeString(result[0])
  robot.keyTap('enter')

  robot.moveMouse(49,900 - 794)
  robot.mouseClick()
}

setTimeout(() => {
  doing();
}, 2000);
