package com.summoners.game.table;

import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import com.summoners.game.engine.Player;

public class GameRoom {

	private static final Logger logger = LoggerFactory.getLogger(GameRoom.class);

	private String uniqueID;

	private List<Player> players;

	public GameRoom() {
		uniqueID = UUID.randomUUID().toString();
	}

	public String getUniqueID() {
		return uniqueID;
	}

	public void setUniqueID(String uniqueID) {
		this.uniqueID = uniqueID;
	}

	public void addPlayer(Player player) {
		players.add(player);
	}

}
