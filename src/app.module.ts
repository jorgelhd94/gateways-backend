import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModule } from './gateways/gateways.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [GatewaysModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
