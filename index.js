const robot = require("robotjs")
const constant = require('./constant')
const action = require('./actions')
const screen = require('./screen')
const { sleep } = require('./utils')

const doing = async() => {
    await randomDoing();
    await doing();
}

const actions = ['x', 'd', 'w', 'q', 'r', 'left', 'right', 'down']

const randomDoing = async() => {
    const a = actions[Math.floor(Math.random() * actions.length)]
    console.log(a);
    // robot.keyTap(a)
    action.按下(a);
    await sleep(.2);
    action.松开(a);
    await sleep(.2);
}

setTimeout(() => {
    doing();
}, 1000);