import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully register.',
  })
  @ApiResponse({
    status: 400,
    description: 'Email is already register.',
  })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully login.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('access')
  @Auth()
  verifyAccess() {
    return 'Access granted!!';
  }
}
