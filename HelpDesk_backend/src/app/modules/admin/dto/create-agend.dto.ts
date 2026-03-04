import { ApiProperty } from '@nestjs/swagger';
import {
  zEmail,
  zName,
  zPassword,
} from 'src/app/common/validation/validate-fields';
import z from 'zod';

export class CreateAgentSwaggerDto {
  @ApiProperty({
    description: 'Nome completo do agente',
    minLength: 2,
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Email do agente',
    format: 'email',
    example: 'joao@exemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do agente (mínimo 6 caracteres)',
    minLength: 6,
    example: 'senha123',
  })
  password: string;
}

export const createAgentSchema = z
  .object({
    name: zName,
    email: zEmail,
    password: zPassword,
  })
  .strict();

export type CreateAgentDto = z.infer<typeof createAgentSchema>;
