/**
 * @fileOverview app配置
 * @author liuyouren
 * @date 2018/08/17
 * APP_NAME的app对应相同位置的APP_LIST的配置，
 * 这里APP_LIST对应了login和test两个应用的配置，
 * BASE_URL为二级目录，也为根域上下文目录；INDEX_HTML代表了该应用的默认起始页，值为src/modules/下的模块目录名；
 * CONTEXT_DIRECTORY为正常目录结构，类型为数组，数组元素为string时，对应该级下存在对应的以模块目录为名称的html文件，
 * 数组元素为Object时，代表存在下级。
 */
const APP_LIST = [{
  BASE_URL: 'test', // 二级目录
  INDEX_HTML: 'test', // 默认页（自动改名为index.html）
  CONTEXT_DIRECTORY: [],
  TITLE: '测试'
},
{
  BASE_URL: 'login', // 二级目录
  INDEX_HTML: 'login', // 默认页（自动改名为index.html）
  CONTEXT_DIRECTORY: [],
  TITLE: '登录'
}
]
const APP_NAME = APP_LIST.map(v => v.BASE_URL)

module.exports = {
  APP_NAME, // 应用名，按顺序对应APP_LIST元素位
  APP_LIST
}
