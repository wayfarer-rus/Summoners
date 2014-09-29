package com.project.sum;

import org.junit.Test;

import com.project.sum.engine.Deck;
import com.project.sum.services.DeckService;

public class TestEntities {
	
	@Test
	public void testEntity(){
		Deck benders =  DeckService.createDeck("b");
		benders.setupOnBoardDeck();
	}
	
}
