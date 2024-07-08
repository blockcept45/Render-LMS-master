// src/user/user.controller.ts

import { Controller, Get, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { GoogleService } from './google.service';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken'; 
@Controller('user')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    if (!user || !user.id || !user.email || !user.firstName || !user.lastName || !user.picture) {
      return res.redirect('http://localhost:3000/login'); // Redirect to login or error page if user data incomplete
    }

    // Generate JWT token with user data
    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName , picture: user.picture },
      'your-secret-key',
      { expiresIn: '1h' } // Example: Token expires in 1 hour
    );

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true }); // Ensure cookie is secure and httpOnly in production

    // Optionally, set other user details in cookies
    res.cookie('userId', user.id);
    res.cookie('userEmail', user.email);
    res.cookie('userFirstName', user.firstName);
    res.cookie('userLastName', user.lastName);
    res.cookie('userPicture', user.picture);

    // Redirect to your frontend URL
    res.redirect('https://saarthilms.netlify.app/home');
    // res.send("save")
  }

  // @Post('auth/google')
  // async googleAuthVerify(@Body() body) {
  //   const { token } = body;
  //   try {
  //     // Verify Google token with Google API
  //     const response = await axios.post(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
  //     const payload = response.data;

  //     // Use payload data to create or update user
  //     const userData = {
  //       oauthId: payload.sub,
  //       email: payload.email,
  //       firstName: payload.given_name,
  //       lastName: payload.family_name,
  //       picture: payload.picture,
  //       accessToken: token,
  //     };

  //     const user = await this.googleService.findOrCreateUser(userData);

  //     // Generate a JWT or session token
  //     const jwtToken = 'your-generated-jwt-token'; // Implement JWT generation logic

  //     return { token: jwtToken };
  //   } catch (error) {
  //     throw new Error('Google authentication failed');
  //   }
  // }
}
