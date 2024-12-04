import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalStrategy } from './auth/local.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/board.entity';
import { BoardModule } from './board/board.module';
import { Entries } from './entries/entries.entity';
import { EntriesModule } from './entries/entries.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [PassportModule, AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',  // You can change this to 'postgres', 'sqlite', etc.
      host: '127.0.0.1',  // Your database host
      port: 3306,  // MySQL default port
      username: 'root',  // Your database username
      password: 'root',  // Your database password
      database: 'board',  // Your database name
      entities: [Board,Entries],  // List of your entity classes (e.g., User)
      synchronize: true,  // Should be true in development only
    }),
    BoardModule,
	EntriesModule
  ],
  controllers: [AppController],
  providers: [JwtService,UsersService,AuthService,LocalStrategy, AppService],
})
export class AppModule {}
