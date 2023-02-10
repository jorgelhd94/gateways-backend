import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaysService } from './gateways.service';
import { GatewaysController } from './gateways.controller';
import { GatewayModel } from './schemas/gateway.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Gateway', schema: GatewayModel.schema },
    ]),
  ],
  controllers: [GatewaysController],
  providers: [GatewaysService],
})
export class GatewaysModule {}
