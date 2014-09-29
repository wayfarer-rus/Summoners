package com.project.sum.engine;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameRoom {

	private static final Logger logger = LoggerFactory.getLogger(GameRoom.class);

	private String uniqueID;

	private List<GamePlayer> players = new ArrayList<>();

	public GameRoom() {
		uniqueID = UUID.randomUUID().toString();
	}

	public String getUniqueID() {
		return uniqueID;
	}

	public void setUniqueID(String uniqueID) {
		this.uniqueID = uniqueID;
	}

	public void addPlayer(GamePlayer player) {
		players.add(player);
	}

	public List<GamePlayer> getPlayers() {
		return players;
	}
	
	

}
