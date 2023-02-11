import { IsString, IsIP, IsOptional } from 'class-validator';
import { Device } from 'src/devices/schemas/device.schema';

export class CreateGatewayDto {
  @IsString()
  serialNumber: string;

  @IsString()
  name: string;

  @IsIP(4)
  ipAddress: string;

  @IsOptional()
  devices: Device[];
}
