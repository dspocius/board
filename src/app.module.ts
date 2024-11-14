import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/board.entity';
import { BoardModule } from './board/board.module';
import { Entries } from './entries/entries.entity';
import { EntriesModule } from './entries/entries.module';
@Module({
    imports: [
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
  providers: [AppService],
})
export class AppModule {}
