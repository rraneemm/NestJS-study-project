import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn() {
    return 'Signing In';
  }
  signUp() {
    return 'Signing Up';
  }
}
