import { IsPositive, IsNumber, IsDate, IsIn, IsString } from 'class-validator';

export class UpdateDeviceDto {
  @IsNumber()
  @IsPositive()
  uid: number;

  @IsString()
  vendor: string;

  @IsDate()
  dateCreated: Date;

  @IsIn(['online', 'offline'])
  status: 'online' | 'offline';

  @IsString()
  gatewayId: string;
}
