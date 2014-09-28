package com.summoners.game.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.summoners.game.models.User;

@Repository("userDao")
public class UserDaoImpl implements UserDao {
	private static final Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);
	
	@Autowired
	private SessionFactory sessionFactory;

	@SuppressWarnings("unchecked")
	@Transactional
	public User findByUserName(String username) {

		logger.info("Username is " + username);
		
		List<User> users = new ArrayList<User>();

		String query = "SELECT u FROM User u WHERE username = :username";
		
		users = sessionFactory.getCurrentSession().createQuery(query).setParameter("username", username)
				.list();

		if (users.size() > 0) {
			logger.info("User found. Name is " + users.get(0).getUsername());
			return users.get(0);
		} else {
			logger.info("No user");
			return null;
		}

	}

	@Override
	@Transactional
	public void addUser(User user) {
		logger.info("enter addUser()");
		sessionFactory.getCurrentSession().persist(user);
	}

	@Override
	public void updateUser(User user) {
		
	}

	@Override
	public void deleteUserById(int id) {
		
	}

	@Override
	public void deleteUser(User user) {
		
	}

	@Override
	public List<User> getUsers() {
		return null;
	}

	@Override
	public User findUserById(int id) {
		return null;
	}
	
	
	
}