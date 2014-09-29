package com.summoners.game.dao;

import java.util.List;

import com.summoners.game.models.User;

public interface UserDao {

	void addUser(User user);
	
	void updateUser(User user);
	
	
	void deleteUserById(int id);
	
	void deleteUser(User user);
	
	public List<User> getUsers();
	
	User findByUserName(String username);
	
	User findUserById(int id);
	
}