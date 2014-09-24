package com.summoners.game.decks;

import java.util.Observer;
import java.util.UUID;

import com.summoners.game.Card;
import com.summoners.game.Deck;

public class BendersDeck extends Deck {
	private static final String GULLDUNE_SPECIAL_ATTACK = "rollResult = rollDice(card.getCardAttack());"
			+ "var hits = 0;"
			+ "for (die in rollResult) {"
			+ "if (die > 2) hits += 1;"
			+ "}"
			+ "if (hits > 0) {"
			+ "hits = target.specialDefence(hits);"
			+ "target.setHitpoints(target.getHitpoints() - hits);"
			+ "if (target.getHitpoints() <= 0) {"
			+ "var agreed = askPlayer(\"Gulldune can take \" + target.getName() + \" under your control. Agree?\");"
			+ "if (agreed) {"
			+ "takeCardFromOtherPlayer(target);"
			+ "}"
			+ "}"
			+ "}";

	public BendersDeck(Observer eventObserver) {
		name = "Benders";
		commonsCount = 18;
		championsCount = 3;
		eventsCount = 9;
		cardsTotal = commonsCount + championsCount + eventsCount;  
		Card card = new Card(UUID.randomUUID(), "Gulldune", // card name
				Card.CardType.CHAMPION, // card type
				5, // mana cost
				2, // attack power
				4, // hit points
				3, // attack range
				2 // movement speed
				);
		card.setSpecialAttack(GULLDUNE_SPECIAL_ATTACK);
		cards.add(card);
		
		cards.add(new Card(UUID.randomUUID(), "Sorgwen", Card.CardType.CHAMPION, 5, 3, 3, 3, 2));
		cards.add(new Card(UUID.randomUUID(), "Kalal", Card.CardType.CHAMPION, 7, 3, 5, 3, 2));
		
		for (int i = 0; i < 7; ++i) { // seven Deceiver cards
			cards.add(new Card(UUID.randomUUID(), "Deceiver", Card.CardType.COMMON, 1, 1, 1, 3, 2));
		}
		
		for (int i = 0; i < 6; ++i) { // six Controller cards
			cards.add(new Card(UUID.randomUUID(), "Controller", Card.CardType.COMMON, 2, 2, 1, 3, 2));
		}
		
		for (int i = 0; i < 5; ++i) { // six Controller cards
			cards.add(new Card(UUID.randomUUID(), "Breaker", Card.CardType.COMMON, 2, 1, 1, 3, 2));
		}
		
		cards.add(new Card(UUID.randomUUID(), "Takullu", Card.CardType.HERO, 0, 2, 5, 3, 2)); // SUMMONER CARD
		
	}
	
}
