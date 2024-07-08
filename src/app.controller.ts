// import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';

@Controller()
export class AppController {
  googleService: any;
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  // Google OAuth callback route
  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // Handle the Google OAuth callback logic
   
      return { message: 'Google authentication successful', user: req.user };
  }
  
  
  
}
