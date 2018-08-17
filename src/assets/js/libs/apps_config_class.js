
/**
 * @fileOverview app配置数据处理类
 * @author liuyouren
 * @date 2018/08/17
 */

const [
  appConfig,
  resolveConf,
  fnRecursive,
  parseUrl,
  exists
] = [
  require('./../../../config.app'),
  Symbol.for('resolveConf'),
  Symbol.for('fnRecursive'),
  Symbol.for('parseUrl'),
  Symbol.for('exists')
]

module.exports = class AppConf {
  constructor () {
    this.appConfig = appConfig
    this.apps = appConfig.APP_NAME
    this.modulesList = []
    this.urlsObject = Object.create(null)
  }
  get modules () {
    try {
      this[resolveConf]()
      return [...new Set(this.modulesList)]
    } catch (err) {
      console.log('获取模块时出错：', err)
    }
  }
  get urls () {
    try {
      this[resolveConf]()
      return this.urlsObject
    } catch (err) {
      console.log('获取页面路径时出错：', err)
    }
  }
  [resolveConf] () {
    for (let [key, item] of this.appConfig.APP_LIST.entries()) {
      const appName = this.appConfig.APP_NAME[key]
      this.modulesList.push(item.INDEX_HTML)
      Reflect.set(this.urlsObject, appName, Object.create(null))
      this.urlsObject[appName][item.INDEX_HTML] = this[parseUrl]([], item.INDEX_HTML)
      this[fnRecursive](appName, [], item.CONTEXT_DIRECTORY)
    }
  }
  [fnRecursive] (appName, pathsArr, list) {
    for (let item of list) {
      if (typeof item === 'string') {
        this.modulesList.push(item)
        this.urlsObject[appName][item] = this[parseUrl](pathsArr, item)
      } else if (item instanceof Object) {
        for (let [key, val] of Object.entries(item)) this[fnRecursive](appName, [...pathsArr, key], val)
      } else {
        throw new Error('无法识别的模块配置')
      }
    }
  }
  [parseUrl] (...args) {
    let tempArr = []
    for (let item of args) {
      if (item instanceof Array) {
        tempArr = [...tempArr, ...item]
      } else {
        tempArr.push(item)
      }
    }
    return `${tempArr.join('/')}.html`
  }
  appExist (app) {
    return this.apps.includes(app) ? !0 : !1
  }
  appsExist (appArr) {
    return this[exists](appArr, 'app')
  }
  moduleExist (module) {
    return this.modules.includes(module) ? !0 : !1
  }
  modulesExist (modArr) {
    return this[exists](modArr, 'module')
  }
  [exists] (arr, type) {
    let existFlag = true
    for (let item of arr) {
      if (type === 'module') existFlag = this.moduleExist(item)
      if (type === 'app') existFlag = this.appExist(item)
      if (!existFlag) break
    }
    return existFlag
  }
  baseUrl (app) {
    return `/${this.appConfig.APP_LIST[this.apps.findIndex(item => item === app)].BASE_URL}/` || ''
  }
}
