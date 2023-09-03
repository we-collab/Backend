import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async SignUp(signUpDto: SignUpDto) {
    const hash = await argon.hash(signUpDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: signUpDto.name,
          email: signUpDto.email,
          password: hash,
          availability: true, // Add the availability field
          money: 0,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Email already taken');
      } else {
        throw error;
      }
    }
  }

  async SignIn(signInDto: SignInDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: signInDto.email,
      },
    });
    if (!userExists) {
      throw new ForbiddenException('Wrong Credentials');
    }
    const passwordMatches = await argon.verify(
      userExists.password,
      signInDto.password,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Wrong Credentials');
    }
    delete userExists.password;
    return this.SignToken(userExists.id, userExists.email);
  }

  async SignToken(userId: number, email: string) {
    const payload = { sub: userId, email: email };
    const secret = this.config.get('JWT_SECRET');

    const bearer_token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '1d',
    });

    return { Bearer_token: bearer_token };
  }
}
