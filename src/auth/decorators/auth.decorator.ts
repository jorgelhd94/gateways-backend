import { AuthGuard } from '@nestjs/passport';
import { UseGuards, applyDecorators } from '@nestjs/common';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard()));
}
