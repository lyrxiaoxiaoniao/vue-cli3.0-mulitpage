/**
 * vue.config------pages
 * 根据指定模块文件夹，遍历文件夹下的文件目录
 */

const fs = require('fs')
const _ = require('lodash')
const rawArgv = process.argv.slice(2)
console.log('argv', rawArgv)
module.exports = function getPages(path) {
  let arr = {}
  // 检查是否存在目录
  let existPath = fs.existsSync(path)
  if (existPath) {
    let commonResult = []
    // 获取目录下的全部文件
    let readdirSync = fs.readdirSync(path)
    if (rawArgv.includes('serve')) {
      if (rawArgv.length === 1 || rawArgv.includes('--mode')) {
        commonResult = [...readdirSync]
      } else {
        // 比较模块目录数组与命令行数组，返回两个数组相同模块
        commonResult = [..._.intersection(readdirSync, rawArgv)]
      }
    } else if (rawArgv.includes('build')) {
      commonResult.push(rawArgv[1])
    }
    commonResult.map(v => {
      let currentPath = `${path}/${v}`
      // 判断当前文件是不是文件夹
      let isDirector = fs.statSync(currentPath).isDirectory()
      // component目录为公用组件，需要排除
      if (isDirector && v !== 'component') {
        let readdirSyncCurrent = fs.readdirSync(currentPath)
        // 遍历当前模块文件夹所有文件，找到index.html, main.js
        arr[v] = mapDir(readdirSyncCurrent, currentPath, v)
      }
    })
    return arr
  }
}

function mapDir(currentDir, path, dir) {
  let obj = {}
  currentDir.forEach(v => {
    obj['filename'] = `${dir}.html`
    if (v.startsWith('main.js')) {
      obj['entry'] = `${path}/${v}`
    } else if (v.startsWith('index.html')) {
      obj['template'] = `${path}/${v}`
    }
  })
  return obj
}
