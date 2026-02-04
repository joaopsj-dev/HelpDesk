import {
  zEmail,
  zName,
  zPassword,
  zRole,
} from 'src/app/common/validation/validate-fields';
import z from 'zod';

export const registerSchema = z
  .object({
    role: zRole,
    name: zName,
    email: zEmail,
    password: zPassword,
  })
  .strict();

export type RegisterDto = z.infer<typeof registerSchema>;
