/**
 * @fileOverview app配置
 * @author liuyouren
 * @date 2018/08/17
 */

module.exports = {
  APP_NAME: ['login', 'test'], // 应用名，按顺序对应APP_LIST元素位
  APP_LIST: [
    {
      BASE_URL: 'login', // 二级目录
      INDEX_HTML: 'login', // 默认页（自动改名为index.html）
      CONTEXT_DIRECTORY: []
    },
    {
      BASE_URL: 'test', // 二级目录
      INDEX_HTML: 'test', // 默认页（自动改名为index.html）
      CONTEXT_DIRECTORY: []
    }
  ]
}
