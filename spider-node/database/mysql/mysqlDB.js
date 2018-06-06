const mysql = require('mysql');

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'dytt',
    port:'3306',
    charset:'UTF8_GENERAL_CI'
})

var query = function(sql,options,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query("set names utf8");
            conn.query(sql,options,function(err,results,fields){
                conn.release();
                callback(err,results,fields);
            })
        }
    })
}

module.exports = {
    query
}