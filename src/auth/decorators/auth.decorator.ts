import { JwtAuthGuard } from './../guards/jwt.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
