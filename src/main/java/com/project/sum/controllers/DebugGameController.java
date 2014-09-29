package com.project.sum.controllers;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;

import com.project.sum.engine.Deck;
import com.project.sum.engine.GameEngine;
import com.project.sum.engine.GamePlayer;
import com.project.sum.engine.GameRoom;
import com.project.sum.services.DeckService;

@Controller
public class DebugGameController implements ServletContextAware{
	private static final Logger logger = LoggerFactory.getLogger(DebugGameController.class);
	
	private ServletContext servletContext;
	
	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
	
	@RequestMapping(value = "/debug", method = RequestMethod.GET)
	public String debugPage() {
		logger.info("debug page");
		
		GameEngine gameEngine = (GameEngine)servletContext.getAttribute("gameengine");
		
		GameRoom gr = new GameRoom();

		Deck deck = DeckService.createDeck("b");
		
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		GamePlayer gp = new GamePlayer(userDetails.getUsername(), deck);
		
		gr.addPlayer(gp);
		
		gameEngine.addGameRoom(gr);
		
		//ModelAndView model = new ModelAndView();
		//model.addObject("currentRoom", gr);
		//model.addObject("currentPlayer", gp);
		
		return "debug";
	}
	
	@RequestMapping(value = "/get-state", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	/*@Secured("ROLE_USER")*/
	public GameRoom getJsonUser() {
		
		GameEngine gameEngine = (GameEngine)servletContext.getAttribute("gameengine");
		GameRoom gr = gameEngine.getGameRooms().get(0);
		
		return gr;
	}
}
