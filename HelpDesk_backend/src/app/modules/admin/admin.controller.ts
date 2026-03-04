import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAgentDto, createAgentSchema } from './dto/create-agend.dto';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { UserRoleEnum } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { ApiPostAgent } from './admin.swagger';
import { ZodValidationPipe } from 'src/app/common/pipes/zod-validation.pipe';

@ApiTags('admin')
@Controller('admin')
@Roles(UserRoleEnum.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/agent')
  @ApiPostAgent()
  @UsePipes(new ZodValidationPipe(createAgentSchema))
  async createAgent(@Body() data: CreateAgentDto) {
    return await this.adminService.createAgent(data);
  }
}
