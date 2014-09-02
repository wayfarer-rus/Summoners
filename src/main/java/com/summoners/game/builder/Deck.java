package com.summoners.game.builder;

public interface Deck {
  public void beforeAction();
  public void mainAction();
  public void afterAction();
}
