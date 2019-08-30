const robot = require('robotjs')

const 按下键位 = []

xconst 按键 = function(key) {
    robot.keyToggle(key, 'down');
    robot.keyToggle(key, 'up');
}

const 按下 = function(key) {
    robot.keyToggle(key, 'down');
}

// const 按下 = function (key) {
//   const t = setInterval(() => {
//     robot.keyToggle(key, 'down');
//     robot.keyToggle(key, 'up');
//   }, 50);
//   按下键位[key] = t;
// }

const 松开 = function(key) {
    robot.keyToggle(key, 'up');
}

// const 松开 = function(key) {
//     clearInterval(按下键位[key]);
// }

module.exports = {
    按键,
    按下,
    松开,
}