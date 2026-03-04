import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agend.dto';
import { Repository } from 'typeorm';
import { User, UserRoleEnum } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async createAgent(data: CreateAgentDto) {
    const userByEmail = await this.userRepo.findOneBy({ email: data.email });
    if (userByEmail) {
      throw new ConflictException({
        field: 'email',
        message: 'Email já cadastrado',
      });
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      +this.config.get<string>('BCRYPT_HASH_SALT')!,
    );

    await this.userRepo.save({
      ...data,
      role: UserRoleEnum.AGENT,
      password: hashedPassword,
    });

    return { success: true };
  }
}
