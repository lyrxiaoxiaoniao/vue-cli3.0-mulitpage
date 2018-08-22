/**
 * 深拷贝
 * @param {Object} source 拷贝对象
 * @returns {Object}
 */
export function extend(source) {
  let target
  if (typeof source === 'object') {
    target = Array.isArray(source) ? [] : {}
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] !== 'object') {
          target[key] = source[key]
        } else {
          target[key] = extend(source[key])
        }
      }
    }
  } else {
    target = source
  }
  return target
}

/**
 * 节流函数
 * @param method 事件触发的操作
 * @param mustRunDelay 间隔多少毫秒需要触发一次事件
 */
export function throttle(method, mustRunDelay) {
  let timer, start, args
  args = arguments
  return function loop() {
    let self = this
    let now = Date.now()
    if (!start) {
      start = now
    }
    if (timer) {
      clearTimeout(timer)
    }
    if (now - start >= mustRunDelay) {
      method.apply(self, args)
      start = now
    } else {
      timer = setTimeout(function() {
        loop.apply(self, args)
      }, 50)
    }
  }
}

/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
export function debounce(method, delay) {
  let timer = null
  return function() {
    let self = this
    let args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function() {
      method.apply(self, args)
    }, delay)
  }
}
