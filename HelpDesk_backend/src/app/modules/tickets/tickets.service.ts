import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket, TicketStatus } from 'src/entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dtos/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  async create(data: CreateTicketDto, client_id: string): Promise<Ticket> {
    const existing = await this.ticketRepo.findOne({
      where: {
        client_id,
        status: TicketStatus.OPEN,
      },
    });

    if (existing) {
      throw new ConflictException('Já existe um chamado aberto');
    }

    return await this.ticketRepo.save({
      title: data.title,
      description: data.description,
      status: TicketStatus.OPEN,
      client_id,
    });
  }
}
