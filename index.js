const robot = require("robotjs")
const constant = require('./constant')
const action = require('./actions')
const screen = require('./screen')
const {sleep} = require('./utils')

const doing = async () => {
  // action.按下(constant.移动左);
  // await sleep(5);
  // action.松开(constant.移动左);
  const img = screen.捕捉屏幕({x: 0, y: 50, w: 600, h: 600});
  const finds = screen.获取像素位置(img, ['0a0909', 'fffd37'], 20);
  console.log(finds);
  if(finds.length != 2) {
    console.log('没找到');
  } else {

    if(finds[1].y === finds[0].y) {
      console.log('干');
    } else {
      if(finds[1].y > finds[0].y) {
        console.log('向下走');
      } else {
        console.log('向上走');
      }
    }
    // if(finds[1].x > finds[0].x) {
    //   console.log('向右走');
    // } else {
    //   console.log('向左走')
    // }
  }

  await sleep(.1);

  await doing();
}

setTimeout(() => {
  doing();
}, 1000);


