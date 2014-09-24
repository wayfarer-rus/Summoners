package com.summoners.game.controllers;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.summoners.game.Deck;
import com.summoners.game.DeckController;
import com.summoners.game.engine.GameEngine;
import com.summoners.game.engine.Player;
import com.summoners.game.table.GameRoom;

@Controller
public class GameController implements ServletContextAware{
	
	private static final Logger logger = LoggerFactory.getLogger(GameController.class);
	
	private ServletContext servletContext;
	
	@RequestMapping(value = "/creategame", method = RequestMethod.GET)
	public ModelAndView createGame(@RequestParam("deck") String deckName){
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		logger.info("creategame - Get deck: " + deckName + " from user: " + userDetails.getUsername());
		
		GameEngine gameEngine = (GameEngine)servletContext.getAttribute("gameengine");
		GameRoom gr = new GameRoom();
		//Init deck by name and all cards
		Deck deck = DeckController.takeDeck(deckName);
		gr.addPlayer(new Player(userDetails.getUsername(), deck));
		gameEngine.addGameRoom(gr);
		
		ModelAndView model = new ModelAndView();
		model.addObject("gr", gameEngine.getGameRooms());
		//model.setViewName("game");
		
		RedirectView redirectView = new RedirectView("game");
		redirectView.setStatusCode(HttpStatus.MOVED_PERMANENTLY);
		model.setView(redirectView);
		
		return model;
	}
	
	@RequestMapping(value = "/joingame", method = RequestMethod.GET)
	public ModelAndView joinGame(@RequestParam(value = "roomID") String id, @RequestParam(value = "deck") String deckName){
		logger.info("joinGame");
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		logger.info(id + " " + deckName);
		
		GameEngine gameEngine = (GameEngine)servletContext.getAttribute("gameengine");
		GameRoom currentRoom = null;
		
		for(GameRoom gameRoom : gameEngine.getGameRooms()){
			if(gameRoom.getUniqueID().equals(id)){
				currentRoom = gameRoom;
				break;
			}
		}

		//Init deck by name and all cards
		Deck deck = DeckController.takeDeck(deckName);
		currentRoom.addPlayer(new Player(userDetails.getUsername(), deck));
		
		//Init deck by name and all cards
		//DeckInterface deck = DeckBuilder.build(deckName);
		
		//GameRoom gr = GameEngine.getInstance().createGame(userDetails, deck);
		//GameEngine.getInstance().getGameRooms().add(gr);
		
		ModelAndView model = new ModelAndView();
		//model.addObject("gamerooms", GameEngine.getInstance().getGameRooms());
		model.setViewName("game");
		
		return model;
	}
	
	@RequestMapping(value = "/game", method = RequestMethod.GET)
	public void game(){
		logger.info("in game page now");
	}

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
	
	
}
