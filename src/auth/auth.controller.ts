import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') //global route
export class AuthController {
  constructor(private authService: AuthService) {}

  //enpoints
  @Post('signUp')
  signUp() {
    return this.authService.signUp();
  }
  @Post('signIn')
  singIn() {
    return this.authService.signIn();
  }
}
