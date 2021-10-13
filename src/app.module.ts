import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { SpacesModule } from './spaces/spaces.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL!),
    UsersModule,
    MessagesModule,
    SpacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
