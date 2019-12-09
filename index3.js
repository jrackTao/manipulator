const fs = require('fs')
const path = require('path')
const robot = require("robotjs")
const screen = require('./screen')
const constant = require('./constant')
const action = require('./actions')
const {sleep} = require('./utils')

robot.setKeyboardDelay(100)

const 初始坐标 = {
    x: 1110,
    y: 153,
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
    next: 'up',
}, {
    x: 3,
    y: 2,
    next: 'right',
}, {
    x: 4,
    y: 2,
    next: 'up',
},]

const ranAct = [
    ['up', 'right', 'down', 'left'],
    ['up', 'right', 'down'],
    ['right', 'down', 'left'],
    ['up', 'right', 'down',],
    ['right', 'down', 'left'],
    ['up', 'right', 'down',],
    ['up', 'right', 'left'],
    ['up', 'right', 'down'],
]

function 校准坐标() {
    let img = screen.捕捉屏幕({...初始坐标, h: 100, w: 100})
    let 偏移Y轴 = 0;
    let 偏移X轴 = 0;
    for(let 偏移 = 0; 偏移 < img.height; 偏移++) {
        const 颜色 = img.colorAt(50, 偏移)
        if(颜色 !== 'ffffff') {
            偏移Y轴 = 偏移;
            break;
        }
    }

    for(let 偏移 = 0; 偏移 < img.width; 偏移++) {
        const 颜色 = img.colorAt(偏移, 50)
        if(颜色 !== 'ffffff') {
            偏移X轴 = 偏移;
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
    // let img = screen.捕捉屏幕({...小坐标坐标, ...小地图大小 })
    // 测试图像(img)
    return img
}

function 测试图像(img) {
    const colors = []
    for(let i = 0; i < img.width; i++) {
        colors[i] = []
        for(let j = 0; j < img.height; j++) {
            colors[i][j] = img.colorAt(i, j)
        }
    }
    fs.writeFileSync('./json', JSON.stringify(colors));
}

function 获取人物位置(img) {
    const onlyColor = '11aaff';
    for(let i = 0; i < img.width; i++) {
        for(let j = 0; j < img.height; j++) {
            if(img.colorAt(i, j) === onlyColor) {
                const 位置 = 计算位置({x: i, y: j});
                console.log('位置', 位置);
                return 位置
            }
        }
    }
    return null;
}

function 计算位置({x, y}) {
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
let 结束 = false

function 实时获取小地图角色位置() {
    const 小地图 = 获取小地图();
    const 位置 = 获取人物位置(小地图);
}

function 顺图(key) {
    action.按下('alt')
    await sleep(.1)
    action.按下(key)
    await sleep(.1);
    action.松开(key)
    action.松开('alt')
}

setTimeout(() => {
    校准坐标();
    刷图();
    假装攻击();
}, 5000);

function 还原假装攻击按键(index, func) {
    clearTimeout(func)
    if(index === 0) {
        action.松开('top')
        action.松开('right')
        action.松开('down')
    }
}




async function 假装攻击(index) {
    if(index === 0) {
        const func = setTimeout(async () => {
            action.按下('x')
            await sleep(2);
            action.松开('x')
            action.奔跑('right')
            await sleep(1)
            /* 过图 */
            action.按下('top')
            await sleep(0.5)
            action.松开('top')
            action.按下('down')
            await sleep(0.5)
            /* 应急顺图 */
            if(nowIndex === index) {
                顺图('right')
            }
        })
        return func
    }

    if(index === 1) {
        const func = setTimeout(async () => {
            action.按下('x')
            await sleep(2);
            action.松开('x')
            action.按下('down')
            await sleep(1)
            /* 过图 */
            action.按下('left')
            await sleep(1)
            action.松开('left')
            action.按下('right')
            await sleep(1)
            /* 应急顺图 */
            if(nowIndex === index) {
                顺图('down')
            }
        })
        return func
    }
    if(nowIndex === 2) {
        const func = setTimeout(async () => {
            action.按下('x')
            await sleep(2);
            action.松开('x')
            action.奔跑('right')
            await sleep(1)
            /* 过图 */
            action.按下('top')
            await sleep(0.5)
            action.松开('top')
            action.按下('down')
            await sleep(0.5)
            /* 应急顺图 */
            if(nowIndex === index) {
                顺图('right')
            }
        })
        return func
    }
    if(nowIndex === 3) {
        robot.keyToggle('x', 'down');
        robot.keyToggle('right', 'down');
        action.按键('f')
        await sleep(.5);
        robot.keyToggle('x', 'up')
        robot.keyToggle('right', 'up');
    }
    if(nowIndex === 4) {
        robot.keyToggle('x', 'down');
        robot.keyToggle('left', 'down');
        action.按键('f')
        await sleep(.5);
        robot.keyToggle('x', 'up')
        robot.keyToggle('left', 'up');
    }
    if(nowIndex === 5) {
        robot.keyToggle('x', 'down');
        robot.keyToggle('down', 'down');
        action.按键('s')
        await sleep(.5);
        robot.keyToggle('x', 'up')
        robot.keyToggle('down', 'up');
    }
    if(nowIndex === 6) {
        robot.keyToggle('x', 'down');
        robot.keyToggle('left', 'down');
        robot.keyTap('e')
        await sleep(.5);
        robot.keyToggle('x', 'up')
        robot.keyToggle('left', 'up');
    }
    if(nowIndex === 7) {
        robot.keyToggle('x', 'down');
        robot.keyToggle('right', 'down');
        action.按键('f')
        await sleep(.5);
        robot.keyToggle('x', 'up')
        robot.keyToggle('right', 'up');
    }
    if(nowIndex === 8) {
        robot.keyToggle('right', 'down');
        robot.keyToggle('right', 'up');
        robot.keyToggle('right', 'down');
        robot.keyToggle('right', 'up');
        robot.keyToggle('top', 'down');
        robot.keyToggle('x', 'down');
        action.按键('s')
        action.按键('g')
        await sleep(.5);
        robot.keyToggle('x', 'up')
        robot.keyToggle('top', 'up');
    }

}

async function 假装攻击2() {
    if(结束) {
        await sleep(3);
        await 假装攻击2();
    } else {
        const actions = ranAct[nowIndex];
        const a = actions[Math.floor(Math.random() * actions.length)]
        robot.keyToggle(a, 'down');
        await sleep(1);
        robot.keyToggle(a, 'up')
        await 假装攻击2();
    }
}

async function 刷图() {
    const 小地图 = 获取小地图();
    const 位置 = 获取人物位置(小地图);
    if(位置) {
        const 顺序 = 计算顺序(位置);
        nowIndex = 顺序.index;
        noCount = 0;
        await 假装攻击();
        // await sleep(.5);
        // console.log(`第${nowIndex}图：触发方向${顺序.next}`);
        // robot.keyToggle('alt', 'down')
        // await sleep(.1)
        // robot.keyToggle(顺序.next, 'down')
        // await sleep(.1);
        // robot.keyToggle('alt', 'up')
        // robot.keyToggle(顺序.next, 'up')
        // console.log(`触发结束`);
        await 刷图();
    } else {
        console.log('没有找到位置', nowIndex);
        if(noCount >= 1) {
            noCount = 0;
            if(nowIndex === 进图顺序.length - 1) {
                console.log('大boss');
                /* 打Boss等待时间 */
                await 假装攻击();
                await sleep(9);
                结束 = true
                action.按键('escape')
                action.按键('f10')
                nowIndex = 0;
                await sleep(10);
                结束 = false;
                await 刷图();
            }
            if(nowIndex === 0) {
                console.log('重新进图');
                await 刷图();
            }
        } else {
            noCount++;
            await sleep(1);
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