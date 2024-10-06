import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig]
    }),
    DatabaseModule,
    ActorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
