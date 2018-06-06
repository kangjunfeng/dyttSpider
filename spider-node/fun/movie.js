const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const cheerio = require('cheerio')
// const MovieModel = require('../models/dytt_movie.js')
// const async = require('async')
// const db = require('../database/mongodb/db.js');
const dyttUrl  = 'http://www.dytt8.net'
const mysqlManager = require('../database/mysql/mysqlManager.js')


//抓取所有最新电影
function getMovies (callback) {
    console.log('start :'+ new Date());
               
    //获取最新电影的链接
    findNewMovieUrl(function(res){
        var listUrl = dyttUrl+res;
       
        //获取所有电影页数
        getAllPage(listUrl,function(pageList){
            var actions = [];
           
            pageList.forEach(function(url,i){
                var p = new Promise(function(resolve,reject){
                    //获取单页电影数据
                    getOnePageMovies(url,function(list,err){
                         if(err){
                            console.log('getOnePageMovies error '+err);
                            reject(err);
                            return;
                        }
                        resolve(list);
                    });
                }).catch(new Function());
                actions.push(p);
            })

            //总电影数据
            //总回调
            Promise.all(actions).then((list)=>{
                var movieList = [];
                for(index in list){
                    movieList = movieList.concat(list[index]);
                }  
  
                //插入电影
                mysqlManager.insertManyMovies(movieList,function(err,results,fields){
                    if(err){
                        console.log('insertManyMovies error :'+ err);
                        callback({'status':'error'})
                        return;
                    }
                    console.log('end :'+ new Date() +' index:'+index);
                    callback({'status':'success'})
                })
             },error=>{console.log('error '+error)})
        });
    })
}


//获取最新电影网页连接
function findNewMovieUrl (callback) {
    var  url = "";
   
    //主页数据爬取
    superagent.get(dyttUrl)
        .charset('gb2312')
        .end((err,res)=>{
            var _$ = cheerio.load(res.text);
            let p = _$('.co_area2 .title_all em a').each(function(i,elem){
                //只获取最新电影的连接
                if(i > 0) return;
                //获取最新电影的连接
                url  = _$(elem).eq(0).attr('href');
                //返回
                callback(url);
        });
    })
}

//获取所有最新电影的页数
function getAllPage (listUrl,callback) {
    var pages = [];

    superagent.get(listUrl)
        .charset('gb2312')
        .end((err,res)=>{

            var _$ = cheerio.load(res.text);
            
            let p = _$('.bd3r .co_area2 .co_content8 .x select option').each(function(i,elem){
                var $elem = _$(elem);
                var oriUrl = listUrl.replace('index.html','');
                var pageUrl = oriUrl + $elem.attr('value');
                pages.push(pageUrl);
            })

            callback(pages);
        })
}

//获取一页的电影数据
function getOnePageMovies (url,callback) {

    var movies = [];

    superagent.get(url)
        .charset('gb2312')
        .end((err,res)=>{

            var _$ = cheerio.load(res.text);

            let p = _$('.bd3r .co_area2 .co_content8 ul table').each(function(i,elem){
                var $elem = _$(elem);
                //获取标题
                let title = $elem.find('.ulink').text();
                //获取详情链接，用于爬取下载链接
                let href = dyttUrl + $elem.find('.ulink').attr('href');
                //日期
                var date = $elem.find('td font').text();
                date = date.replace('日期：','');
                date = date.replace('点击：0','');
                
                var movieModel = {
                    title:title,
                    href:href,
                    download_url:'',
                    date:date
                };
                movies.push(movieModel);
            })


            //次级界面轮询并获取链接
            getDownloadUrl(movies,res=>{
           
                var movies = [];

                //mysql
                res.forEach(function(item,i){
                    var title = item.title.replace(/[\r\n]/g,"");
                    var movieModel = [
                        title,
                        item.href,
                        item.download_url,
                        item.date
                    ];
                    movies.push(movieModel);
                })

                //完整数据回调
                callback(movies,err);
    
            });
        })
}

//获取电影下载链接
function getDownloadUrl (items=[],callback) {
    var actions = [];
    items.forEach(function(item,m){
        var p = new Promise(function(resolve,reject){
            superagent.get(item.href).charset('gb2312')
                .end((err,res)=>{
                    if(err) {
                        console.log('getDownloadUrl err '+err);
                        reject(err);
                        return;
                    }
                    var _$ = cheerio.load(res.text);
                    var download_url = "";
                     _$('#Zoom table a').each(function(i,elem){
                        if(i>0){
                            download_url = download_url+" <br/>" + _$(elem).attr('href');
                        }else{
                            download_url = _$(elem).attr('href');
                        }
                    });

                    item.download_url = download_url;
                    console.log('item.download_url '+item.download_url);
                    resolve(download_url);
                })
        }).catch(new Function());
        
        actions.push(p);

    })

    Promise.all(actions).then((url)=>{
        callback(items);   
    })
}

module.exports =  {
    getMovies,
}




//mongodb 未去重
// res.forEach(function(obj,i){
//     obj.data.forEach(function(item,n){
//         var movieModel = new MovieModel({
//             title:item.title,
//             href:item.href,
//             download_url:item.download_url,
//             date:item.date
//         });
//         movies.push(movieModel);
//     })
// })
//插入数据库
// MovieModel.insertMany(movies,{upsert:true},function(err,res){
//     if(err){
//         console.log(err);
//     }
//     console.log('insert success');
// })