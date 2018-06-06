package com.kk.dytt.dao;

import com.kk.dytt.model.Movie;
import com.kk.dytt.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

// 加载spring配置文件
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis.xml"})
public class IUserDaoTest {

    @Autowired
    private IMovieDao dao;

    @Test
    public void testSelectUser() throws Exception {
        long id = 1;
        List<Movie> list = dao.getMovies(1,20);
        System.out.println("list " +list);
    }

}