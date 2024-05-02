package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.OtpService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin("*")
public class OtpController {
	@Autowired
	private OtpService otpService;
	@Autowired
	private JavaMailSender mailSender;
	private SimpleMailMessage message;
	private static int OTP;

	@GetMapping("/get-otp")
	public int getForgotOtp() {

		return OTP;
	}
	@PostMapping("/send-otp")
	public ResponseEntity<String> sendOtpMailToUser(@RequestParam("email") String email) {
	    try {
	        OTP = otpService.generateOtp();

	        MimeMessage mimeMessage = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
	        helper.setFrom("deepak.bisht20010904@gmail.com");
	        helper.setTo(email);
	        helper.setSubject("Forgot Password - OTP Verification");
	        
	        String htmlContent = "<!DOCTYPE html>" +
	                "<html lang=\"en\">" +
	                "<head>" +
	                "<meta charset=\"UTF-8\">" +
	                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
	                "<title>OTP Email</title>" +
	                "<style>" +
	                "@media only screen and (max-width: 600px) {" +
	                ".container {" +
	                "width: 100% !important;" +
	                "}" +
	                "}" +
	                "</style>" +
	                "</head>" +
	                "<body style=\"font-family: Arial, sans-serif; margin: 0; padding: 0;\">" +
	                "<table role=\"presentation\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">" +
	                "<tr>" +
	                "<td style=\"padding: 20px 0; text-align: center; background-color: #f2f2f2;\">" +
	                "<h1 style=\"color: #333;\">Your One-Time Password (OTP)</h1>" +
	                "</td>" +
	                "</tr>" +
	                "<tr>" +
	                "<td style=\"padding: 20px 0; text-align: center;\">" +
	                "<p style=\"font-size: 18px;\">Hello " + email + ",</p>" +
	                "<p style=\"font-size: 16px;\">Your OTP for authentication is: <strong style=\"color: #007bff;\">" + OTP + "</strong></p>" +
	                "<p style=\"font-size: 16px;\">Please use this code to complete your action.</p>" +
	                "</td>" +
	                "</tr>" +
	                "</table>" +
	                "</body>" +
	                "</html>";
	        
	        helper.setText(htmlContent, true); // Set the HTML content and specify it as HTML
	        
	        mailSender.send(mimeMessage);
	        return ResponseEntity.ok("OTP has been sent to your email");
	    } catch (MailException | MessagingException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Error occurred while sending OTP: " + e.getMessage());
	    }
	}
	
	
	

}