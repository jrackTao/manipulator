const robot = require("robotjs")
const constant = require('./constant')
const action = require('./actions')
const screen = require('./screen')
const { sleep } = require('./utils')

const doing = async() => {
    await randomDoing();
    // await doing();
}

const actions = ['x', 'd', 'w', 'q', 'r', 'left',
    'right', 'down'
]

const randomDoing = async() => {
    // const a = actions[Math.floor(Math.random() * actions.length)]
    // console.log(a);
    // action.按下(a);
    // // robot.keyTap(a)
    // await sleep(.2);


    // action.松开(a);
    // await sleep(.2);
    robot.keyTap('right', 'alt')
}

setTimeout(() => {
    doing();
}, 3000);