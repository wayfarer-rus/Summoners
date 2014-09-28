package com.summoners.game.engine;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.summoners.game.table.GameRoom;

public class GameEngine {

	private static final Logger logger = LoggerFactory.getLogger(GameEngine.class);
	
	private static GameEngine instance = null;

	private List<GameRoom> gameRooms = new ArrayList<GameRoom>();
	 
	private GameEngine(){} 

	public static GameEngine getInstance() {
		if (instance == null) {
			instance = new GameEngine();
		}
		return instance;
	}
	
	public void addGameRoom(GameRoom room) {
		gameRooms.add(room);
	}

	public List<GameRoom> getGameRooms() {
		return gameRooms;
	}

}
