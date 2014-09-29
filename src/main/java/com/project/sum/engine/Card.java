package com.project.sum.engine;

import java.util.UUID;

public class Card {
	public enum CardType {
		CHAMPION,
		COMMON,
		HERO,
		EVENT,
		WALL
	}
	
	private UUID uniqueIdOftheCard;
	private String name = "";
	private CardType type;
	private int movementSpeed = 2;
	private int cardCost = 1;
	private int cardAttackPower = 1;
	private int attackRange = 1;
	private int hitpoints = 0;
	private int x_pos = 0;
	private int y_pos = 0;
	// Special modofocators
	private String specialMovement = null;
	private String specialAttack = null;
	private String specialDefence = null;
	private String specialDeath = null;
	
	public Card(UUID uniqueId, String name, CardType type, int cost, int attack, int hitpoints, int attackRange, int movementSpeed) {
		this.uniqueIdOftheCard = uniqueId;
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

	public void setPosition(int x, int y) {
		x_pos = x;
		y_pos = y;
	}

	public int getXPos() {
		return x_pos;
	}
	
	public int getYPos() {
		return y_pos;
	}
	
	public CardType getCardType() {
		return type;
	}

	public int getHitpoints() {
		return hitpoints;
	}

	public void setHitpoints(int hitpoints) {
		this.hitpoints = hitpoints;
	}

	public UUID getUniqueIdOftheCard() {
		return uniqueIdOftheCard;
	}

	public String getName() {
		return name;
	}

	public CardType getType() {
		return type;
	}

	public int getCardAttackPower() {
		return cardAttackPower;
	}

	public int getX_pos() {
		return x_pos;
	}

	public int getY_pos() {
		return y_pos;
	}

	public void setSpecialAttack(String specialAttack) {
		this.specialAttack = specialAttack;
	}

	@Override
	public String toString() {
		return name + " " + type;
	}
}
