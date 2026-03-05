import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from 'src/entities/ticket.entity';
import { TicketsGateway } from './ticket.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Ticket]), AuthModule],
  providers: [TicketsService, TicketsGateway],
  controllers: [TicketsController],
})
export class TicketsModule {}
