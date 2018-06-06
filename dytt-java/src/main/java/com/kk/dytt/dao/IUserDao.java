package com.kk.dytt.dao;

import com.kk.dytt.model.User;

public interface IUserDao {

    User selectUser(long id);

}