package com.project.sum.engine;

import com.project.sum.services.DeckService;


public class GamePlayer {
	private String playerName;
	private Deck drawPile;
	private Deck manaPile;
	private Deck discardPile;
	private Deck onBoardPile;
	private Deck hand;

	public GamePlayer(String name, Deck deck) {
		this.playerName = name;
		this.onBoardPile = deck.setupOnBoardDeck();
		DeckService.shuffle(deck);
		this.drawPile = deck;
		manaPile = null;
		discardPile = null;
		hand = null;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	public Deck getDrawPile() {
		return drawPile;
	}

	public void setDrawPile(Deck drawPile) {
		this.drawPile = drawPile;
	}

	public Deck getManaPile() {
		return manaPile;
	}

	public void setManaPile(Deck manaPile) {
		this.manaPile = manaPile;
	}

	public Deck getDiscardPile() {
		return discardPile;
	}

	public void setDiscardPile(Deck discardPile) {
		this.discardPile = discardPile;
	}

	public Deck getHand() {
		return hand;
	}

	public void setHand(Deck hand) {
		this.hand = hand;
	}

	public Deck getOnBoardPile() {
		return onBoardPile;
	}

	public void setOnBoardPile(Deck onBoardPile) {
		this.onBoardPile = onBoardPile;
	}
	
}
