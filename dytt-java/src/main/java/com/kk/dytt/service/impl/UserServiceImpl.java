package com.kk.dytt.service.impl;

import com.kk.dytt.dao.IUserDao;
import com.kk.dytt.model.User;
import com.kk.dytt.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("userService")
public class UserServiceImpl implements IUserService {

    @Resource
    private IUserDao userDao;

    public User selectUser(long userId) {
        return this.userDao.selectUser(userId);
    }

}