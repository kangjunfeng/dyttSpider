package com.kk.dytt.service.impl;


import com.kk.dytt.dao.IMovieDao;
import com.kk.dytt.model.Movie;
import com.kk.dytt.service.IMovieService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("moviesService")
public class MoviesServiceImpl implements IMovieService {

    @Resource
    private IMovieDao movieDao;

    /**
     * 获取所有电影
     * @return
     */
    public List<Movie> getAllMovies() {
        return  this.movieDao.getAllMovies();
    }

    /**
     * 获取分页电影数据
     * @param pageStart
     * @param pageSize
     * @return
     */
    public List<Movie> getMovies(int pageStart,int pageSize) {

        HashMap<String,Object> map = new HashMap<>();
        map.put("pageStart",pageStart);
        map.put("pageSize",pageSize);

        return  this.movieDao.getMovies(pageStart,pageSize);
    }

    /**
     * 获取所有电影数目
     * @return
     */
    public Long getMoviesAmount(){
        return  this.movieDao.getMoviesAmount();
    }

}
