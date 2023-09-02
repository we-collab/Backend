import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  SignUp(@Body() signUpDto: SignUpDto) {
    return this.authService.SignUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  SignIn(@Body() signInDto: SignInDto) {
    return this.authService.SignIn(signInDto);
    // return this.authService.create(signInDto);
  }

  // @Post()
  // SignOut() {
  //   return this.authService.create();
  // }
}
