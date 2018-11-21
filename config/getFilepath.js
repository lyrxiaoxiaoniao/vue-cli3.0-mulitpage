/**
 * vue.config------pages
 * 根据指定模块文件夹，遍历文件夹下的文件目录
 */

const fs = require('fs')
const argv = process.argv
module.exports = function getFilePath(path) {
  let arr = {}
  // 检查是否存在目录
  let existPath = fs.existsSync(path)

  if (existPath) {
    // 获取目录下的全部文件
    let readdirSync = fs.readdirSync(path)
    readdirSync.map(v => {
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
