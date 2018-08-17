/**
 * @fileOverview vue配置所需数据处理类
 * @author liuyouren
 * @date 2018/08/17
 */

const path = require('path')
const glob = require('glob')
const AppConf = require('./apps_config_class')
const appconf = new AppConf()
const handleError = Symbol.for('handleError')

module.exports = class VueConf {
  constructor (argv) {
    this.globPathHtml = ['./src/modules/**/index.html', 'template'] // 入口模板正则
    this.globPathJs = ['./src/modules/**/main.js', 'entry'] // 入口脚本正则
    this.rawArgv = argv.slice(2)
    this.newArgv = argv.slice(3)
    // this.baseUrl = 'dev'
    this.baseUrl = ''
    this.pages = Object.create(null)
    this.tempSet = new Set()
    this.init()
  }
  init () {
    try {
      while (this.vueEntryPages(...this.globPathHtml) && this.vueEntryPages(...this.globPathJs)) return this.pages
    } catch (err) {
      console.log('获取多页数据错误：', err)
    }
  }
  allPages () {
    const result = Object.create(null)
    for (let item of Object.values(appconf.urls)) Object.assign(result, item)
    return result
  }
  validPages () {
    let [result, allPages] = [Object.create(null), this.allPages()]
    if (this.rawArgv[0] === 'serve') {
      if (this.rawArgv.length === 1) {
        result = allPages
      } else {
        for (let item of this.newArgv) Reflect.set(result, item, allPages[item])
      }
    } else if (this.rawArgv[0] === 'build') {
      this.baseUrl = appconf.baseUrl(this.newArgv[0])
      result = appconf.urls[this.newArgv[0]]
    }
    return result
  }
  vueEntryPages (globPath, type) {
    const [pages, tempSet, validPages] = [this.pages, this.tempSet, this.validPages()]
    let [matchList, tempArr, modName] = [glob.sync(globPath), [], null]
    if (matchList.length !== 0) {
      for (let entry of matchList) {
        tempArr = path.dirname(entry, path.extname(entry)).split('/')
        modName = tempArr[tempArr.length - 1]
        if (!Object.keys(validPages).includes(modName)) {
          continue
        } else {
          if (tempSet.has(modName)) {
            Object.assign(pages[modName], { [type]: entry, 'filename': validPages[modName] })
          } else {
            Reflect.set(pages, modName, { [type]: entry }) && tempSet.add(modName)
          }
        }
      }
      if (Object.keys(pages).length !== 0) {
        return true
      } else {
        this[handleError](type)
      }
    } else {
      this[handleError](type)
    }
  }
  [handleError] (type) {
    if (type === 'template') {
      throw new Error('无法获取多页入口模板')
    } else if (type === 'entry') {
      throw new Error('无法获取多页入口脚本')
    } else {
      throw new Error('无法获取多页信息')
    }
  }
}
