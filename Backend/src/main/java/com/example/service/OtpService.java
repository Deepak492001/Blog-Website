package com.example.service;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

public int generateOtp() {
	return 	(int)Math.floor(Math.random()*999999);
}



}
