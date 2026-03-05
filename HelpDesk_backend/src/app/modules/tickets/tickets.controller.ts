import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../auth/auth.controller';
import { CreateTicketDto, createTicketSchema } from './dtos/create-ticket.dto';
import { ZodValidationPipe } from 'src/app/common/pipes/zod-validation.pipe';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { UserRoleEnum } from 'src/entities/user.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('/open')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ZodValidationPipe(createTicketSchema))
  @Roles(UserRoleEnum.CLIENT)
  async create(@Body() data: CreateTicketDto, @Req() req: AuthRequest) {
    return await this.ticketsService.create(data, req.user.sub);
  }
}
