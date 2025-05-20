import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthFacade } from 'src/context/auth/application/AuthFacade';

interface AuthDTO {
  username: string;
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthFacade) {}

  @Post('register')
  signUp(@Body() dto: AuthDTO) {
    return this.auth.signUp(dto.username, dto.password);
  }

  @Post('login')
  login(@Body() dto: AuthDTO) {
    return this.auth.signIn(dto.username, dto.password);
  }
}
