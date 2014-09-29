package com.summoners.game;

import java.util.ArrayList;
import java.util.List;

public class Deck {
	protected String name = "";
	protected int cardsTotal = 0;
	protected int commonsCount = 0;
	protected int championsCount = 0;
	protected int eventsCount = 0;
	protected List<Card> cards = new ArrayList<Card>();
	
	public Deck() {}
		
	public String getName() {
		return name;
	}
	
	public void setName(String newName) {
		name = newName;
	}
	
	public int getCommonsCount() {
		return commonsCount;
	}

	public void setCommonsCount(int commonsCount) {
		this.commonsCount = commonsCount;
	}

	public int getChampionsCount() {
		return championsCount;
	}

	public void setChampionsCount(int championsCount) {
		this.championsCount = championsCount;
	}

	public int getEventsCount() {
		return eventsCount;
	}

	public void setEventsCount(int eventsCount) {
		this.eventsCount = eventsCount;
	}

	public List<Card> getCards() {
		return cards;
	}
	
	public void setCards(List<Card> newCards) {
		cards = newCards;
	}

}
