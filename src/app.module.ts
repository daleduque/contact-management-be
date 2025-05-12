import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ContactModule, MongooseModule.forRoot('mongodb://localhost:27017/contact-management'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
