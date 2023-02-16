import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIP } from 'class-validator';

export class CreateGatewayDto {
  @ApiProperty()
  @IsString()
  serialNumber: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsIP(4)
  ipAddress: string;
}
