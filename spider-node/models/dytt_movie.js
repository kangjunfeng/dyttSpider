const mongoose = require('mongoose')
const db = require('../database/mongodb/db.js')

var MovieSchema = new mongoose.Schema({
    title:{type:String, unique: true},
    href:{type:String},
    download_url:{type:String},
    date:{type:String}
})

module.exports = db.model('movies',MovieSchema);//关联数据表 movies