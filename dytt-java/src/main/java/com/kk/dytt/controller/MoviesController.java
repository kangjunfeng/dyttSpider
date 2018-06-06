package com.kk.dytt.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kk.dytt.model.Movie;
import com.kk.dytt.service.IMovieService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.json.JsonObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.StringWriter;
import java.lang.reflect.Array;
import java.util.*;


@Controller
@RequestMapping("/movies")
public class MoviesController {

    @Resource
    private IMovieService service;


    @RequestMapping(value = "/getAllMovies",method = RequestMethod.POST)
    public void getAllMovies(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //获取所有电影数据
        List<Movie> list = this.service.getAllMovies();

        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("status",0);
        resultMap.put("message","success");
        resultMap.put("data",list);

        //json
        ObjectMapper mapper = new ObjectMapper();
        String json = "" ;
        try {
           json  =  mapper.writeValueAsString(resultMap);
        }catch (IOException e){
            e.printStackTrace();;

            Map<String,Object> errorMap = new HashMap<>();
            resultMap.put("status",1);
            resultMap.put("message","error");
            json =  mapper.writeValueAsString(errorMap);
            response.getWriter().write(json);

            return;
        }

        response.getWriter().write(json);

    }

    @RequestMapping(value = "/getMovies",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getMovies(@RequestBody Map map) throws IOException {

        //请求参数
        int pageStart = (int) map.get("pageStart");
        int pageSize  = (int) map.get("pageSize");

        //获取分页电影数据
        List<Movie> list = this.service.getMovies(pageStart,pageSize);
        //分割连接数组
        for (Movie movie:list) {
            String[] strList = movie.getDownload_url().split("<br/>");
            movie.setUrlArray(Arrays.asList(strList));
        }

        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("status",0);
        resultMap.put("message","success");
        resultMap.put("data",list);

        //json
        ObjectMapper mapper = new ObjectMapper();
        String json = "" ;

        try {
            json = mapper.writeValueAsString(resultMap);
        }catch (IOException e){
            e.printStackTrace();

            Map<String,Object> errorMap = new HashMap<>();
            resultMap.put("status",1);
            resultMap.put("message","error");

            json =  mapper.writeValueAsString(errorMap);

        }

        return json;
    }


    @RequestMapping(value = "/getMoviesAmount",method = RequestMethod.POST)
    public void getMoviesAmount(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //获取分页电影数据
        Long amount = this.service.getMoviesAmount();

        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("status",0);
        resultMap.put("message","success");
        resultMap.put("data",amount);

        //json
        ObjectMapper mapper = new ObjectMapper();
        String json = "" ;

        try {
          json = mapper.writeValueAsString(resultMap);
        }catch (IOException e){
            System.out.println("amount error");
            e.printStackTrace();

            Map<String,Object> errorMap = new HashMap<>();
            resultMap.put("status",1);
            resultMap.put("message","error");
            json = mapper.writeValueAsString(errorMap);
            response.getWriter().write(json);
            return;
        }

        response.getWriter().write(json);

    }

    @RequestMapping(value = "/test",method = RequestMethod.POST)
    public void test(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("test");
    }

}
