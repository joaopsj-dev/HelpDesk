import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
