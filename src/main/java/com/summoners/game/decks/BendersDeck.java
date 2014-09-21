package com.summoners.game.decks;

import com.summoners.game.Card;
import com.summoners.game.Deck;

public class BendersDeck extends Deck {

	public BendersDeck() {
		name = "Benders";
		commonsCount = 18;
		championsCount = 3;
		eventsCount = 9;
		cardsTotal = commonsCount + championsCount + eventsCount;  
		cards.add(new Card("Gulldune", // card name
				Card.CardType.CHAMPION, // card type
				5, // mana cost
				2, // attack power
				4, // hit points
				3, // attack range
				2 // movement speed
				// special
				));
		cards.add(new Card("Sorgwen", Card.CardType.CHAMPION, 5, 3, 3, 3, 2));
		cards.add(new Card("Kalal", Card.CardType.CHAMPION, 7, 3, 5, 3, 2));
		
		for (int i = 0; i < 7; ++i) { // seven Deceiver cards
			cards.add(new Card("Deceiver", Card.CardType.COMMON, 1, 1, 1, 3, 2));
		}
		
		for (int i = 0; i < 6; ++i) { // six Controller cards
			cards.add(new Card("Controller", Card.CardType.COMMON, 2, 2, 1, 3, 2));
		}
		
		for (int i = 0; i < 5; ++i) { // six Controller cards
			cards.add(new Card("Breaker", Card.CardType.COMMON, 2, 1, 1, 3, 2));
		}
		
		cards.add(new Card("Takullu", Card.CardType.HERO, 0, 2, 5, 3, 2)); // SUMMONER CARD
		
		// TODO:: Events
	}
	
}
