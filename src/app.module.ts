import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'notepad.db',
      entities: [],
      synchronize: true, // Set to false in production
      logging: true,
    }),
    // AuthModule,
    // UsersModule,
    // NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
