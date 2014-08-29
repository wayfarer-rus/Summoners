package com.summoners.game.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GameController {
	private static final Logger logger = LoggerFactory.getLogger(GameController.class);
	
	@RequestMapping(value = "/createGame", method = RequestMethod.GET, produces = { "text/html; charset=UTF-8" })
	public void createGame(@RequestParam String command){
		
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		logger.info("Get command: " + command + " from user " + userDetails.getUsername());
	}
	
	@RequestMapping(value = "/joinGame", method = RequestMethod.GET, produces = { "text/html; charset=UTF-8" })
	public void joinGame(@RequestParam String command){
		
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		logger.info("Get command: " + command + " from user " + userDetails.getUsername());
	}
}
