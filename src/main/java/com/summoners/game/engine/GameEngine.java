package com.summoners.game.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameEngine {

	private static final Logger logger = LoggerFactory.getLogger(GameEngine.class);
	
	private static GameEngine instance = null;

	private GameEngine(){} 

	public static GameEngine getInstance() {
		if (instance == null) {
			instance = new GameEngine();
		}
		return instance;
	}
	
	private void initGame(){
		logger.info("enter initGame()");
		
		
	}
}
