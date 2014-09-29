package com.summoners.game.engine;

import com.summoners.game.Deck;
import com.summoners.game.DeckController;

public class Player {
	private String playerName;
	private Deck drawPile;
	private Deck manaPile;
	private Deck discardPile;
	private Deck hand;

	public Player(String name, Deck deck) {
		this.playerName = name;
		DeckController.shuffle(deck);
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

}
