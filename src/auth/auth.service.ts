import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if not exist throw exception
    if (!user) throw new ForbiddenException('Credentials Incorrect');
    // compare hash
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if has incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    // if all is well return user
    delete user.hash;
    return user;
  }

  async signUp(dto: AuthDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        // to avoid returning the hash we can use select: not handy
      });
      // easy dirty solution until we use transformation
      delete user.hash;
      // return saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credential taken');
        } // code for violation of unique constraint
      }
      throw error;
    }
  }
}
