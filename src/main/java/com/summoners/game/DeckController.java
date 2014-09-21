package com.summoners.game;

import java.util.Collections;
import java.util.List;

import com.summoners.game.decks.BendersDeck;

public class DeckController {

	private DeckController() {}
	
	public static Deck takeDeck(String deckName) {
		switch (deckName) {
		case "Benders":
			return new BendersDeck();
		}
		
		return new Deck();
	}
	
	public static Deck shuffle(Deck deck) {
		Deck shuffledDeck = deck;
		List<Card> cards = shuffledDeck.getCards();
		Collections.shuffle(cards);
		shuffledDeck.setCards(cards);
		return shuffledDeck; 
	}
	
	public static Card drawCard(Deck deck) {
		List<Card> cards = deck.getCards();
		Card card = cards.remove(0);
		deck.setCards(cards);
		return card;
	}
}
