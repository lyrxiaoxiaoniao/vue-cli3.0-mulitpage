const modules_data = require('./config.app')

const modules_list = []
const app_name = modules_data.APP_NAME
const app_list = modules_data.APP_LIST
const urls = Object.create(null)
const titles = Object.create(null)

class AppConf {
  constructor() {
    this._resolveConf()
  }
  get modules() {
    return modules_list
  }
  get url() {
    return urls
  }
  get title() {
    return titles
  }

  _resolveConf() {
    app_list.forEach((item, index) => {
      const key = app_name[index]
      const index_name = item.INDEX_HTML

      modules_list.push(index_name)

      urls[key] = Object.create(null)
      urls[key][index_name] = this._parseUrl([], item.INDEX_HTML)

      titles[key] = Object.create(null)
      titles[key].title = item.TITLE || index_name
    })
  }

  _parseUrl(...args) {
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

  baseUrl(app) {
    return `/${app_list[app_name.findIndex(item => item === app)].BASE_URL}/` || ''
  }
}

module.exports = new AppConf()
