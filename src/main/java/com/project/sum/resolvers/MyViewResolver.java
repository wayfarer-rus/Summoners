package com.project.sum.resolvers;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;


public class MyViewResolver implements ViewResolver {

	private static final Logger logger = LoggerFactory.getLogger(MyViewResolver.class);
	
	private ViewResolver htmlResolver;
	private ViewResolver jspResolver;

	public void setJspResolver(ViewResolver jspResolver) {
		this.jspResolver = jspResolver;
	}

	public void setTilesResolver(ViewResolver htmlResolver) {
		this.htmlResolver = htmlResolver;
	}

	@Override
	public View resolveViewName(String viewName, Locale locale) throws Exception {
		logger.info("Lookinf for appropriate view resolver");
		if (isHtmlView(viewName)) {
			logger.info("ViewResolver is html");
			return htmlResolver.resolveViewName(viewName, locale);
		} else {
			logger.info("ViewResolver is jsp");
			return jspResolver.resolveViewName(viewName, locale);
		}
	}

	private boolean isHtmlView(String viewName) {
		logger.info("ViewName is " + viewName);
		return false;
	}
}
