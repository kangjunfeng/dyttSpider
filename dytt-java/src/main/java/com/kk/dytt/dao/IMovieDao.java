package com.kk.dytt.dao;

import com.kk.dytt.model.Movie;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface IMovieDao {

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
    public List<Movie> getMovies(@Param("pageStart") int pageStart, @Param("pageSize") int pageSize);


    /**
     * 获取所有电影数目
     * @return
     */
    public Long getMoviesAmount();

}
