import { IsPositive, IsNumber, IsDate, IsIn, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsNumber()
  @IsPositive()
  uid: number;

  @IsString()
  vendor: string;

  @IsDate()
  dateCreated: Date;

  @IsIn(['online', 'offline'])
  status: 'online' | 'offline';
}
