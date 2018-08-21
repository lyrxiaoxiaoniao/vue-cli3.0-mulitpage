// 带时间的本地存储获取
/* eslint-disable */
class Storage {
  constructor() {
    this.storage = window.localStorage
    this.prefix = 'pfxt_'
  }

  set(key, value, fun) {
    let data = ''
    if (typeof value !== 'string') {
      try {
        data = JSON.stringify(value)
      } catch (e) {}
    } else {
      data = JSON.stringify(value)
    }
    this.storage.setItem(this.prefix + key, data)
    typeof fun === 'function' && fun()
  }

  get(key, fun) {
    let value = this.storage.getItem(this.prefix + key)
    try {
      value = JSON.parse(value)
      if (value === null) value = null
    } catch (e) {
      value = null
    }
    return typeof fun === 'function' ? fun.call(this, value) : value
  }
  setTime(key, value, fun) {
    let data = value
    data.time = new Date().getTime()
    if (typeof value !== 'string') {
      try {
        data = JSON.stringify(data)
      } catch (e) {}
    }
    this.storage.setItem(this.prefix + key, data)
    typeof fun === 'function' && fun()
  }
  getTime(key, time, fun) {
    let value = null
    let data = null
    try {
      data = this.storage.getItem(this.prefix + key) || null // 获取储存
      value = data ? JSON.parse(data) : {}
      if (!value.time) {
        console.error('获取的存储没有time字段!')
        return
      }
      const now = new Date().getTime() // 当前时间
      const H = time ? Number(time) * 3600000 : 24 * 3600000

      if (Number(value.time) < now - H) {
        this.storage.removeItem(this.prefix + key)
        value = null
      }
    } catch (e) {
      value = {}
    }
    return typeof fun === 'function' ? fun.call(this, value) : value
  }
  remove(key) {
    this.storage.removeItem(this.prefix + key)
  }
}
export default new Storage()
