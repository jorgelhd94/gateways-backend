import { ApiProperty } from '@nestjs/swagger';
import {
  IsPositive,
  IsNumber,
  IsDate,
  IsIn,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  uid: number;

  @ApiProperty()
  @IsString()
  vendor: string;

  @ApiProperty()
  @IsDate()
  dateCreated: Date;

  @ApiProperty()
  @IsIn(['online', 'offline'])
  status: 'online' | 'offline';

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  gatewayId?: string;
}
