const fs = require('fs')
const path = require('path')
const robot = require("robotjs")
const screen = require('./screen')
const constant = require('./constant')
const action = require('./actions')
const { sleep } = require('./utils')

const 初始坐标 = {
    x: 1074,
    y: 160,
}

const 小地图大小 = {
    w: 95,
    h: 80,
    hCount: 4,
    wCount: 5,
}
let nowIndex = 0;
const 进图顺序 = [{
    x: 0,
    y: 1,
    next: 'right',
}, {
    x: 1,
    y: 1,
    next: 'down',
}, {
    x: 1,
    y: 2,
    next: 'right',
}, {
    x: 2,
    y: 2,
    next: 'down',
}, {
    x: 2,
    y: 3,
    next: 'right',
}, {
    x: 3,
    y: 3,
    next: 'top',
}, {
    x: 3,
    y: 2,
    next: 'right',
}, {
    x: 4,
    y: 2,
    next: 'top',
}, ]

function 校准坐标() {
    let img = screen.捕捉屏幕({...初始坐标, h: 100, w: 100 })
    let 偏移Y轴 = 0;
    let 偏移X轴 = 0;
    for (let 偏移 = 0; 偏移 < img.height; 偏移++) {
        const 颜色 = img.colorAt(50, 偏移)
            // console.log('y', 颜色);

        if (颜色 !== 'ffffff') {
            偏移Y轴 = 偏移;
            // console.log(偏移Y轴);
            break;
        }
    }

    for (let 偏移 = 0; 偏移 < img.width; 偏移++) {
        const 颜色 = img.colorAt(偏移, 50)
            // console.log('x', 颜色);
        if (颜色 !== 'ffffff') {
            偏移X轴 = 偏移;
            // console.log(偏移X轴);
            break;
        }
    }
    初始坐标.x += 偏移X轴
    初始坐标.y += 偏移Y轴
    console.log('校准之后的坐标：', 初始坐标);
    // img = screen.捕捉屏幕({...初始坐标, h: 100, w: 100 })
    // 测试图像(img)
}

function 获取小地图() {
    const 小地图坐标偏移 = {
        x: 700,
        y: 26,
    }
    const 小坐标坐标 = {
        x: 初始坐标.x + 小地图坐标偏移.x,
        y: 初始坐标.y + 小地图坐标偏移.y,
    }
    let img = screen.捕捉屏幕({...小坐标坐标, ...小地图大小 })
        // 测试图像(img)
    return img
}

function 测试图像(img) {
    const colors = []
    for (let i = 0; i < img.width; i++) {
        colors[i] = []
        for (let j = 0; j < img.height; j++) {
            colors[i][j] = img.colorAt(i, j)
        }
    }
    fs.writeFileSync('./json', JSON.stringify(colors));
}

function 获取人物位置(img) {
    const onlyColor = '11aaff';
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            if (img.colorAt(i, j) === onlyColor) {
                const 位置 = 计算位置({ x: i, y: j });
                console.log('位置', 位置);
                return 位置
            }
        }
    }
    return null;
}

function 计算位置({ x, y }) {
    const perW = 小地图大小.w / 小地图大小.wCount;
    const perH = 小地图大小.h / 小地图大小.hCount;

    const 位置 = {
        x: Math.floor(x / perW),
        y: Math.floor(y / perH),
    }

    return 位置
}

function 计算顺序(位置) {
    const findItem = 进图顺序.find(item => item.x === 位置.x && item.y === 位置.y);
    const findItemindex = 进图顺序.findIndex(item => item.x === 位置.x && item.y === 位置.y);
    return {
        next: findItem.next,
        index: findItemindex,
    }
}

let noCount = 0;
// setTimeout(() => {
校准坐标();
刷图();
// }, 2000);

function 假装攻击() {
    const actions = ['d', 's', 'w', 'f', 'right', 'top', 'left', 'down']
    robot.keyTap('left');
    const a = actions[Math.floor(Math.random() * actions.length)]
    robot.keyTap('x');
    robot.keyTap(a);
}

async function 刷图() {
    const 小地图 = 获取小地图();
    const 位置 = 获取人物位置(小地图);
    假装攻击()
    if (位置) {
        const 顺序 = 计算顺序(位置);
        nowIndex = 顺序.index;
        noCount = 0;
        console.log(顺序);
        await sleep(2);
        robot.keyTap(顺序.next, 'alt')
        await 刷图();
    } else {
        console.log('没有找到位置', nowIndex);
        if (noCount >= 4) {
            noCount = 0;
            // if (nowIndex == 3 || nowIndex == 4) {
            //     const 顺序 = 进图顺序[++nowIndex];
            //     console.log('推测', 顺序);
            //     await sleep(3);
            //     await 刷图();
            // }
            if (nowIndex === 进图顺序.length - 1) {
                console.log('大boss');
                await sleep(8);
                keyTap.keyTap('escape')
                console.log('翻牌');
                keyTap.keyTap('tab');
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                keyTap.keyTap('x')
                console.log('捡东西');
                keyTap.keyTap('f10')
                console.log('F10');
                nowIndex = 0;
                await sleep(5);
                await 刷图();
            }
            if (nowIndex === 0) {
                console.log('重新进图');
                // await 刷图();
            }

        } else {
            noCount++;
            await sleep(2);
            await 刷图();
        }


    }

}

function a() {
    json.forEach(arr => {
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
}