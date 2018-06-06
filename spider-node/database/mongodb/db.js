const mongoose = require('mongoose')
const db = mongoose.createConnection('mongodb://localhost:27017/dytt')

db.on('error',function(err){
    console.log('数据库连接失败:',err)
})

db.on('open',function(){
    console.log('数据库连接成功!')
})

module.exports  = db;