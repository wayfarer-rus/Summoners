package com.summoners.game.builder;

import org.apache.log4j.Logger;

public class DeckBuilder {
  private static final Logger logger = Logger.getLogger(DeckBuilder.class);

  private DeckBuilder() {
    
  }
  
  public static Deck build(String deckName) {
    logger.debug("+ enter in deck build");
    switch (deckName) {
   	  case "b":
        return new DeckBenders();
   	  case "mv":
   		return new DeckMountainVargath();
      default:
        break;
    }
    return null;
  }
  
  
  
  
}
