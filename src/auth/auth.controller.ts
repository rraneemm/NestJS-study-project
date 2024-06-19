import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth') //global route
export class AuthController {
  constructor(private authService: AuthService) {}

  //enpoints
  @Post('signUp')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  @Post('signIn')
  singIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
