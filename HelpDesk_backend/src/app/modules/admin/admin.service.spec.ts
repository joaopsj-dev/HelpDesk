import { Test } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRoleEnum } from 'src/entities/user.entity';
import { CreateAgentDto } from './dto/create-agend.dto';
import { ConflictException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');

const user: User = {
  id: 'valid_id',
  role: UserRoleEnum.AGENT,
  name: 'name',
  email: 'email',
  password: 'hashed_password',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AdminService', () => {
  let service: AdminService;
  let userRepo: { findOneBy: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    const mockerUserRepo = {
      findOneBy: jest.fn(),
      save: jest.fn(),
    };
    const module = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(User),
          useValue: mockerUserRepo,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) =>
              key === 'BCRYPT_HASH_SALT' ? '10' : undefined,
            ),
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    userRepo = module.get(getRepositoryToken(User));
  });

  describe('createAgent', () => {
    const dto: CreateAgentDto = {
      email: user.email,
      password: 'valid_password',
      name: user.name,
    };

    it('should rethrow unexpected errors', async () => {
      const error = new Error('unexpected errors');

      userRepo.findOneBy.mockRejectedValue(error);

      await expect(service.createAgent(dto)).rejects.toThrow(error);
    });

    it('should throw ConflictException if email already registered', async () => {
      userRepo.findOneBy.mockResolvedValue(user);

      await expect(service.createAgent(dto)).rejects.toThrow(ConflictException);
      expect(userRepo.findOneBy).toHaveBeenCalledWith({
        email: user.email,
      });
    });

    it('should called hash method with corrects values', async () => {
      userRepo.findOneBy.mockResolvedValue(null);
      userRepo.save.mockResolvedValue(user);

      await service.createAgent(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
    });

    it('should called save method with correct data', async () => {
      userRepo.findOneBy.mockResolvedValue(null);
      userRepo.save.mockResolvedValue(user);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

      await service.createAgent(dto);

      expect(userRepo.save).toHaveBeenCalledWith({
        ...dto,
        role: UserRoleEnum.AGENT,
        password: 'hashed_password',
      });
    });

    it('should returns success on create agent', async () => {
      userRepo.findOneBy.mockResolvedValue(null);
      userRepo.save.mockResolvedValue(user);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

      const result = await service.createAgent(dto);

      expect(result.success).toBe(true);
    });
  });
});
