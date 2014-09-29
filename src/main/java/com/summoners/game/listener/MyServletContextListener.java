package com.summoners.game.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.summoners.game.engine.GameEngine;

public class MyServletContextListener implements ServletContextListener{

	private static final Logger logger = LoggerFactory.getLogger(MyServletContextListener.class);
	
	@Override
	public void contextInitialized(ServletContextEvent event) {
		logger.info("Init gameEngine in listener");
		GameEngine gameEngine = GameEngine.getInstance();
		event.getServletContext().setAttribute("gameengine", gameEngine);
	}

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		
	}

}
