const mysqlDB = require('./mysqlDB.js');

const SELECT_ALL_MOVIE = "select * from movies order by desc";
const SELECT_MOVIE = "select * from movies order by date desc limit  "
const SELECT_COUNT_MOVIE = "select count(*) from movies"
const INSERT_MOVIE = "replace into movies(`title`,`href`,`download_url`,`date`) values ?";

//获取所有电影
var selectAllMovie = function(callback){
    mysqlDB.query(SELECT_ALL_MOVIE,[],function(err,results,fields){
        callback(err,results,fields);
    });
}

//获取电影分页数据
var selectMovie = function(pageStart,pageSize,callback) {
    var sql = SELECT_MOVIE + pageStart+' , '+pageSize;
    mysqlDB.query(sql,[],function(err,results,fields){
        callback(err,results,fields);
    })
}

//获取电影数据量
var selectMovieAmount = function(callback) {
    mysqlDB.query(SELECT_COUNT_MOVIE,[],function(err,results,fields){
        callback(err,results,fields);
    })
}
 
//电影数据插入
var insertOneMovies = function(value,callback){
    mysqlDB.query(INSERT_MOVIE,[value],function(err,results,fields){
        callback(err,results,fields);
    })
}

//电影数据插入
var insertManyMovies = function(values,callback){
    mysqlDB.query(INSERT_MOVIE,[values],function(err,results,fields){
        callback(err,results,fields);
    })
}


module.exports = {
    selectAllMovie,
    selectMovie,
    selectMovieAmount,
    insertOneMovies,
    insertManyMovies
}