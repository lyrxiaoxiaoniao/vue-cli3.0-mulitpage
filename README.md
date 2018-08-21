# vue-cli3.0-multipage

## Description
基于@vue/cli3.0脚手架，配置multipage模板
基于公司现在的工程大多存在多个子应用，且多个子通常使用一套组件，但是子应用采用单独发包迭代。
通常解决方案是建立多个工程，然后前端公共库和组件套等都上传NPM，子应用引入。
这里是把多个子应用模块整合在一个大工程里，所以支持多应用也是有必要

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build {mudule}
```

### Lints and fixes files
```
yarn run lint
```

### Commands
- 指定本地服务启动的运行模块：

	```
	yarn run serve | yarn serve
	```

- 指定单独运行`config.app.js`里面已经声明过的模块名

	```
	yarn run serve --start {module} | yarn serve --start {module}
	```