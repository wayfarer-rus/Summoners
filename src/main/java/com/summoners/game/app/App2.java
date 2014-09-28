package com.summoners.game.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.summoners.game.dao.UserDao;
import com.summoners.game.models.User;

public class App2 {
	private static final Logger logger = LoggerFactory.getLogger(App2.class);
	
	public static void main(String[] args) {

		logger.info("load context");
		
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext(
				"file:src/main/webapp/WEB-INF/spring/root-context.xml");

		UserDao userDao = (UserDao)context.getBean("userDao");
		
		User u = userDao.findByUserName("admin");
		
		logger.info("User: " + u.getUsername());
		
		logger.info("Size: " + u.getUserRole().size());
		
		context.close();
		
	}
}
