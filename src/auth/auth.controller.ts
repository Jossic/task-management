import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCrentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCrentialsDto: AuthCrentialsDto): Promise<void> {
    return this.authService.signUp(authCrentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCrentialsDto: AuthCrentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCrentialsDto);
  }
}
