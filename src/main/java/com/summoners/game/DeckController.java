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
	
	public static void shuffle(Deck deck) {
		List<Card> cards = deck.getCards();
		Collections.shuffle(cards);
		deck.setCards(cards);
	}
	
	public static Card drawCard(Deck deck) {
		List<Card> cards = deck.getCards();
		Card card = cards.remove(0);
		deck.setCards(cards);
		return card;
	}
	
	public static void addCard(Deck deck, Card card) {
		List<Card> cards = deck.getCards();
		cards.add(card);
		deck.setCards(cards);
	}
}
