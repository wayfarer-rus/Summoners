package com.summoners.game.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.summoners.game.dao.UserDao;
import com.summoners.game.models.User;
import com.summoners.game.models.UserRole;

public class App {
private static final Logger logger = LoggerFactory.getLogger(App.class);
	
	public static void main(String[] args) {
		logger.info("load context");
		
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("file:src/main/webapp/WEB-INF/spring/root-context.xml");
		
		User user = new User("user", "12345", true);
		User admin = new User("admin", "12345", true);
		
		
		UserRole userRole = new UserRole(user, "ROLE_USER");
		UserRole adminRole = new UserRole(admin, "ROLE_ADMIN");

		user.getUserRole().add(userRole);
		admin.getUserRole().add(adminRole);
		
		UserDao userDao = (UserDao)context.getBean("userDao");
			
		userDao.addUser(user);
		userDao.addUser(admin);
		
		
		context.close();
		
		
		/*Word word = new Word();
		
		word.setWord_de("Vater");
		word.setWord_eng("Father");
		WordService wordService = (WordService) context.getBean("wordService");
		wordService.persistWord(word);*/
		//logger.debug("Find word :" + wordService.findEmployeeById("123").getAge());		
		//word.setAge(32);
		//emService.updateEmployee(word);
		//System.out.println("Updated age :" + emService.findEmployeeById("123").getAge());
		//emService.deleteEmployee(word);*/
		
	}
}
