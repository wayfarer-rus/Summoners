package com.summoners.game.objects;

import java.util.LinkedList;
import java.util.List;

import com.summoners.game.models.Card;

public class Board {
	
	private final int[][] SIZE = new int[8][8]; 
	
	private List<Card> unitList = new LinkedList<Card>();
	
	@Override
	public String toString() {
		return "The board is init";
	}
}
