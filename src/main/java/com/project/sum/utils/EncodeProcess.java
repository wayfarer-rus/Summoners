package com.project.sum.utils;

import org.mindrot.jbcrypt.BCrypt;

public class EncodeProcess {
	
	public static void main(String[] args){
		System.out.println("1: " + BCrypt.hashpw("andrey", "$2a$06$.rCVZVOThsIa97pEDOxvGuRRgzG64bvtJ0938xuqzv18d3ZpQhstC"));
		System.out.println("2: " + BCrypt.hashpw("fedor", "$2a$06$.rCVZVOThsIa97pEDOxvGuRRgzG64bvtJ0938xuqzv18d3ZpQhstC"));
		System.out.println("3: " + BCrypt.hashpw("maksim", "$2a$06$.rCVZVOThsIa97pEDOxvGuRRgzG64bvtJ0938xuqzv18d3ZpQhstC"));
		System.out.println("4: " + BCrypt.hashpw("arthur", "$2a$06$.rCVZVOThsIa97pEDOxvGuRRgzG64bvtJ0938xuqzv18d3ZpQhstC"));
	}
	
}
