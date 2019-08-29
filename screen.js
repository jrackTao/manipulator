const robot = require('robotjs')

const 捕捉屏幕 = ({x = 0, y = 0, w = 100, h = 100}) => {
  const img = robot.screen.capture(x, y, w, h);
  img.multi = img.width / w;
  return img;
}

const 获取像素位置 = (img, color, 精度 = 10) => {
  const {width, height, multi} = img;
  const preWidth = width / 精度;
  const preHeight = height / 精度;
  const result = []
  for(let i = 1; i < 精度; i++) {
    for(let j = 1; j < 精度; j++) {
      const [x, y] = [i * preWidth, j * preHeight]
      const c = img.colorAt(x, y);
      const findI = color.indexOf(c);
      if(findI !== -1) {
        result[findI] = {x, y};
        color.splice(findI, 1)
        if(color.length === 0) return result;
      }
    }
  }
  return result;
}

module.exports = {
  捕捉屏幕,
  获取像素位置,
}