import { Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';
import { DevicesModule } from './devices/devices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_PRODUCTION),
    CommonModule,
    AuthModule,
    GatewaysModule,
    DevicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
