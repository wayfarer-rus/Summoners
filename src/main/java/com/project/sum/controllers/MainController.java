package com.project.sum.controllers;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	/*@RequestMapping(value = "/admin**", method = RequestMethod.GET)
	public ModelAndView adminPage() {
		logger.info("enter adminPage()");
		ModelAndView model = new ModelAndView();
		model.addObject("title", "Spring Security + Hibernate Example");
		model.addObject("message", "This page is for ROLE_ADMIN only!");
		model.setViewName("admin");

		return model;

	}*/

	/*@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView login(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "logout", required = false) String logout, HttpServletRequest request) {
		
		logger.info("enter login()");
		
		ModelAndView model = new ModelAndView();
		if (error != null) {
			model.addObject("error", getErrorMessage(request, "SPRING_SECURITY_LAST_EXCEPTION"));
		}

		if (logout != null) {
			model.addObject("msg", "You've been logged out successfully.");
		}
		model.setViewName("login");

		return model;

	}*/

	// customize the error message
	/*private String getErrorMessage(HttpServletRequest request, String key) {
		
		logger.info("enter getErrorMessage()");
		
		Exception exception = (Exception) request.getSession().getAttribute(key);

		String error = "";
		if (exception instanceof BadCredentialsException) {
			error = "Invalid username and password!";
		} else if (exception instanceof LockedException) {
			error = exception.getMessage();
		} else {
			error = "Invalid username and password!";
		}

		return error;
	}*/
	
	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public String userPage() {

		return "/content/user.jsp";
	}
	
	/*@RequestMapping(value = { "/", "/main" }, method = RequestMethod.GET)
	public ModelAndView defaultPage() {
		logger.info("enter defaultPage()");
		
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		ModelAndView model = new ModelAndView();
		model.addObject("title", "Welcome, " + userDetails.getUsername());
		model.setViewName("main");
		return model;

	}*/
	
	@RequestMapping(value = { "/main" }, method = RequestMethod.GET)
	public String mainPage() {
		logger.info("in main page");
		return "/content/main.jsp";
	}
	
	@RequestMapping(value = { "/", "/login" }, method = RequestMethod.GET)
	public ModelAndView login(@RequestParam(value = "error", required = false) String error) {

		ModelAndView model = new ModelAndView();
		if (error != null) {
			model.addObject("error", "Invalid username or password!");
		}

		model.setViewName("login.jsp");

		return model;

	}

	@RequestMapping(value = "/accessDenied", method = RequestMethod.GET)
	public ModelAndView accesssDenied(Principal user) {

		ModelAndView model = new ModelAndView();

		if (user != null) {
			model.addObject("errorMsg", user.getName() + " у вас нет доступа к этой странице!");
		} else {
			model.addObject("errorMsg", "У вас нет доступа к этой странице!");
		}

		model.setViewName("/content/accessDenied.jsp");
		return model;
	}
	
	// for 403 access denied page
	/*@RequestMapping(value = "/403", method = RequestMethod.GET)
	public ModelAndView accesssDenied() {
		
		logger.info("enter accesssDenied()");
		
		ModelAndView model = new ModelAndView();

		// check if user is login
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			UserDetails userDetail = (UserDetails) auth.getPrincipal();
			System.out.println(userDetail);

			model.addObject("username", userDetail.getUsername());

		}

		model.setViewName("403");
		return model;

	}*/
}
