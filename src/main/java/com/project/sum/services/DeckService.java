package com.project.sum.services;

import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.project.sum.engine.Card;
import com.project.sum.engine.Deck;
import com.project.sum.entities.BendersDeck;

public class DeckService {

	private static final Logger logger = LoggerFactory.getLogger(DeckService.class);
	
	private DeckService() {}
	
	public static Deck createDeck(String deckName) {
		logger.info("+ enter in takeDeck() with deckName = " + deckName);
		switch (deckName) {
		case "mv":
			//Mountain Vargath
			throw new UnsupportedOperationException("deck with name Mountain Vargath not ready yet");
		case "b":
			//Benders
			return new BendersDeck();
		}
		
		//return new Deck();
		throw new IllegalArgumentException("Argument " + deckName + "is unknown");
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
