import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateAgentSwaggerDto } from './dto/create-agend.dto';

export function ApiPostAgent() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar Agente',
    }),
    ApiBody({ type: CreateAgentSwaggerDto }),
    ApiResponse({
      status: 201,
      description: 'Sucesso na criação',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Não autenticado (token ausente ou inválido)',
    }),
    ApiResponse({
      status: 403,
      description: 'Acesso negado (não possui permissâo)',
    }),
    ApiResponse({
      status: 409,
      description: 'Email já cadastrado no sistema',
    }),
  );
}
