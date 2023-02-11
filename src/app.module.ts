import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModule } from './gateways/gateways.module';
import { DevicesModule } from './devices/devices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongo:mongo@cluster0.3qsyk6t.mongodb.net/gatewaysdb',
    ),
    CommonModule,
    GatewaysModule,
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
