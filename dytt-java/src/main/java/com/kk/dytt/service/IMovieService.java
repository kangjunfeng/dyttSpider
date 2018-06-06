package com.kk.dytt.service;

import com.kk.dytt.model.Movie;

import java.util.List;
import java.util.Map;

public interface IMovieService {

    /**
     * 获取所有的电影
     * @return
     */
    public List<Movie> getAllMovies();


    /**
     * 获取分页电影数据
     * @param pageStart
     * @param pageSize
     * @return
     */
    public List<Movie> getMovies(int pageStart, int pageSize);

    /**
     * 获取所有电影数目
     * @return
     */
    public Long getMoviesAmount();
}
