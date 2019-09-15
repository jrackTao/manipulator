const fs = require('fs')
const path = require('path')
const robot = require("robotjs")
const screen = require('./screen')

const 初始坐标 = {
  x: 1200,
  y: 200,
}

function 校准坐标() {
  const img = screen.捕捉屏幕({...初始坐标, h: 100, w: 100})
  const res = screen.获取像素位置(img, '#62827d')
  const colors = []
  let 偏移Y轴 = 0;
  let 偏移X轴 = 0;
  for(let 偏移 = 0; 偏移 < img.height; 偏移++) {
    const 颜色 = img.colorAt(50, 偏移)
    if(颜色 !== 'ffffff') {
      偏移Y轴 = 偏移;
    }
  }

  for(let 偏移 = 0; 偏移 < img.width; 偏移++) {
    const 颜色 = img.colorAt(偏移, 50)
    if(颜色 !== 'ffffff') {
      偏移X轴 = 偏移;
    }
  }

  console.log(偏移X轴, 偏移Y轴);
  初始坐标.x += 偏移X轴
  初始坐标.y += 偏移Y轴
  console.log(初始坐标);
}

// setTimeout(() => {
doing();
// }, 2000);


jsonp.forEach(arr => {
  const divp = document.createElement('div')
  divp.style.display = 'inline-block'
  divp.style.height = '1px'
  arr.forEach(c => {
    const div = document.createElement('div');
    console.log(c);
    div.style.backgroundColor = '#' + c;
    div.style.display = 'block'
    div.style.width = '1px'
    div.style.height = '1px'
    divp.appendChild(div)
  })
  document.body.appendChild(divp)
})