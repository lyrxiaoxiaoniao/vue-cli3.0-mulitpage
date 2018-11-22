const minimist = require('minimist')
const glob = require('glob')
const path = require('path')
const modeList = require('./apps_config_class')

/**
 * @class VueConfig
 *
 * 需求:
 *  build:
 *    单模块:
 *       yarn build name
 *  test:
 *    在打包的基础上区分测试环境
 *      yarn build name --test
 *  serve:
 *    单模块启动:
 *      yarn serve name
 *    全部模块:
 *      yarn serve
 *    自定义模块启动:
 *      yarn --m name1,name2,...
 */

const html_Path = ['./src/views/**/index.html', 'template'] // 入口模板正则
const js_Path = ['./src/views/**/main.js', 'entry'] // 入口脚本正则

const _argv = minimist(process.argv)
let [mode_type_cli, mode_name_cli] = [null, null]

class VueConfig {
  constructor() {
    this.pages = Object.create(null)
    this.tempSet = new Set()
    this.baseUrl = ''
    this._handleArgv()
    this._init()
  }

  get distUrl() {
    return this.baseUrl
  }

  get page() {
    return this.pages
  }

  _init() {
    try {
      this._entryPages(html_Path, js_Path)
    } catch (err) {
      console.log('获取多页数据错误：', err)
    }
  }

  /**
   * 处理命令行
   *
   * @memberof VueConfig
   */
  _handleArgv() {
    mode_type_cli = _argv._[2]
    mode_name_cli = _argv._[3] || (_argv.m && _argv.m.split(','))
  }

  /**
   * 处理报错
   *
   * @param {*} type
   * @memberof VueConfig
   */
  _handleError(type) {
    if (type === 'template') {
      throw new Error('无法获取多页入口模板')
    } else if (type === 'entry') {
      throw new Error('无法获取多页入口脚本')
    } else {
      throw new Error('无法获取多页信息')
    }
  }

  /**
   * 获取配置中的所有模块
   *
   * @returns 数据格式: {mode1:'mode1.html',mode2:'mode2.html',...}
   * @memberof VueConfig
   */
  _allPages() {
    const modes = Object.create(null)
    const urls = modeList.url || Object.create(null)
    Object.keys(urls).forEach((e) => {
      Object.assign(modes, urls[e])
    })
    return modes
  }

  /**
   * 验证模块html路径
   *
   * @returns
   * @memberof VueConfig
   */
  _validPages() {
    const [result, allPages] = [Object.create(null), this._allPages()]
    if (mode_type_cli === 'serve') {
      if (!mode_name_cli) {
        Object.keys(allPages).forEach((v) => {
          if (v) result[v] = `${v}.html`
        })
      } else if (this._isPages(mode_name_cli)) {
        for (const item of mode_name_cli) {
          if (item) result[item] = `${item}.html`
        }
      } else {
        mode_name_cli.forEach((v) => {
          result[v] = `${v}.html`
        })
      }
    }
    if (mode_type_cli === 'build') {
      if (!mode_name_cli || typeof mode_name_cli !== 'string') {
        throw new Error('请使用单模块打包!')
      }

      result[mode_name_cli] = 'index.html'

      this.baseUrl = modeList.baseUrl(mode_name_cli)
    }
    return result
  }

  /**
   * 输出多模块配置
   *
   * @param {*} html
   * @param {*} js
   * @returns
   * @memberof VueConfig
   */
  _entryPages(html, js) {
    const [validPages, title] = [this._validPages(), modeList.title]
    const fun = (data) => {
      const [globPath, type] = [data[0], data[1]]
      let [matchList, tempArr, modName] = [glob.sync(globPath), [], null]
      if (matchList.length !== 0) {
        for (const entry of matchList) {
          tempArr = path.dirname(entry, path.extname(entry)).split('/')
          modName = tempArr[tempArr.length - 1]
          if (!Object.keys(validPages).includes(modName)) {
            continue
          } else if (this.tempSet.has(modName)) {
            Object.assign(this.pages[modName], { [type]: entry, filename: validPages[modName], ...title[modName] })
          } else {
            this.pages[modName] = { [type]: entry }
            this.tempSet.add(modName)
          }
        }
        return true
      }
      this._handleError(type)
    }
    return fun(html) && fun(js)
  }

  /**
   * 判断多模块还是单模块
   * 多模块 true
   * 单模块 false
   *
   * @param {*} page
   * @returns
   * @memberof VueConfig
   */
  _isPages(page) {
    if (typeof page === 'string') {
      return false
    } else if (page.length === 1) {
      return false
    }
    return true
  }
}

module.exports = new VueConfig()
