var express = require('express')
var router = express.Router()
var moviesManager = require('../database/mysql/mysqlManager.js')
var app  = express()
var moviesCrawler = require('../fun/movie.js')

/* 重新爬取数据 */
router.post('/crawlingMovies', function(req, res, next) {
    moviesCrawler.getMovies(result=>{
        res.json(result);
    });
});

/* 获取所有电影 */
router.post('/getAllMovies', function(req, res, next) {
    moviesManager.selectAllMovie(function(err,results,fields){
        if(err){
          res.json({'status':1,message:'error'});
          return;
        }

        res.json({
          'status':0,
          'message':'success',
          'data':results
        });
    });
});

/* 获取指定电影数据 */
router.post('/getMovies', function(req, res, next) {
    var pageStart = req.body.pageStart;
    var pageSize  = req.body.pageSize;
    moviesManager.selectMovie(pageStart,pageSize,function(err,results,fields){
        if(err){
          console.log('select err '+err);
          res.json({'status':1,message:'error'});
          return;
        }

        results.forEach(element => {
            var strArray = [];
            strArray = element.download_url.split('<br/>');
            element.urlArray = strArray;
            console.log('element '+element);
        });

        res.json({
          'status':0,
          'message':'success',
          'data':results
        });
    });
});

/* 获取指定电影数据量 */
router.post('/getMoviesAmount', function(req, res, next) {
    moviesManager.selectMovieAmount(function(err,results,fields){
        if(err){
          res.json({'status':1,message:'error'});
          return;
        }
        res.json({
          'status':0,
          'message':'success',
          'data':results[0]['count(*)']
        });
    });
});


module.exports =  router;
