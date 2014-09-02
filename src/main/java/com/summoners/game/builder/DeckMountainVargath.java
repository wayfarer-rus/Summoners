package com.summoners.game.builder;

import java.util.HashSet;
import java.util.Set;

import com.summoners.game.models.Card;

public class DeckMountainVargath implements Deck{

	private String name;
	
	private Set<Card> cardSet = new HashSet<Card>();
	
	@Override
	public void beforeAction() {
		
	}

	@Override
	public void mainAction() {
		
	}

	@Override
	public void afterAction() {
		
	}
	
	@Override
	public String toString() {
		return "Mountain Vargath";
	}
	
}
