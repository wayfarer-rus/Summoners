package com.summoners.game.table;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.summoners.game.builder.Deck;
import com.summoners.game.objects.Board;

public class GameRoom {
	
	private static final Logger logger = LoggerFactory.getLogger(GameRoom.class);
	
	private String uniqueID;
	
	private Board board;
	
	private String user1;
	
	private String user2;
	
	private Deck deck1;
	
	private Deck deck2;
	
	public GameRoom() {
		logger.info("Init game without args");
	}
	
	public GameRoom(String user1, Board board, Deck deck1) {
		logger.info("User " + user1 + " created game");
		
		setUniqueID(UUID.randomUUID().toString());
		setUser1(user1);
		setBoard(board);
		setDeck1(deck1);
		
	}
	
	public Board getBoard() {
		return board;
	}

	public void setBoard(Board board) {
		this.board = board;
	}

	public String getUser1() {
		return user1;
	}

	public void setUser1(String user1) {
		this.user1 = user1;
	}

	public String getUser2() {
		return user2;
	}

	public void setUser2(String user2) {
		this.user2 = user2;
	}

	public Deck getDeck1() {
		return deck1;
	}

	public void setDeck1(Deck deck1) {
		this.deck1 = deck1;
	}

	public Deck getDeck2() {
		return deck2;
	}

	public void setDeck2(Deck deck2) {
		this.deck2 = deck2;
	}

	public String getUniqueID() {
		return uniqueID;
	}

	public void setUniqueID(String uniqueID) {
		this.uniqueID = uniqueID;
	}
}
