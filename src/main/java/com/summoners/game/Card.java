package com.summoners.game;

public class Card {
	public enum CardType {
		CHAMPION,
		COMMON,
		HERO,
		EVENT
	}
	
	private String name = "";
	private CardType type;
	private int movementSpeed = 2;
	private int cardCost = 1;
	private int cardAttackPower = 1;
	private int attackRange = 1;
	private int hitpoints = 0;

	public Card(String name, CardType type, int cost, int attack, int hitpoints, int attackRange, int movementSpeed) {
		this.name = name;
		this.type = type;
		this.cardCost = cost;
		this.cardAttackPower = attack;
		this.attackRange = attackRange;
		this.movementSpeed = movementSpeed;
		this.hitpoints = hitpoints;
	}

	public int getMovementSpeed() {
		return movementSpeed;
	}

	public void setMovementSpeed(int movementSpeed) {
		this.movementSpeed = movementSpeed;
	}

	public int getCardCost() {
		return cardCost;
	}

	public void setCardCost(int cardCost) {
		this.cardCost = cardCost;
	}

	public int getCardAttack() {
		return cardAttackPower;
	}

	public void setCardAttack(int cardAttack) {
		this.cardAttackPower = cardAttack;
	}

	public int getAttackRange() {
		return attackRange;
	}

	public void setAttackRange(int attackRange) {
		this.attackRange = attackRange;
	}
	
	
}
