import { IsPositive, IsNumber, IsDate } from 'class-validator';
import { IsIn, IsString } from 'class-validator/types/decorator/decorators';

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
