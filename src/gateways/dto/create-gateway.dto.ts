import { IsString, IsIP } from 'class-validator';

export class CreateGatewayDto {
  @IsString()
  serialNumber: string;

  @IsString()
  name: string;

  @IsIP(4)
  ipAddress: string;
}
