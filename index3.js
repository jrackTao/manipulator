const fs = require('fs')
const path = require('path')
const robot = require("robotjs")
const screen = require('./screen')
function doing() {
  const img = screen.捕捉屏幕({x: 115, y: 0, h: 20, w: 20})
  const res = screen.获取像素位置(img, '#62827d')
  const colors = []
  for(let i = 0; i < img.width; i++) {
    colors[i] = []
    for(let j = 0; j < img.height; j++) {
      colors[i][j] = img.colorAt(i, j)
    }
  }
  console.log(JSON.stringify(colors));
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
    div.style.backgroundColor = '#'+c;
    div.style.display = 'block'
    div.style.width = '1px'
    div.style.height = '1px'
    divp.appendChild(div)
  })
  document.body.appendChild(divp)
})