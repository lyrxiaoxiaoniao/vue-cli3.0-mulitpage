const getPages = require('./config/getPages')
console.log(process.argv, 'process.argv')
console.log(getPages('./src/views'))
