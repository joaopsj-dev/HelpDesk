import { zEmail, zPassword } from 'src/app/common/validation/validate-fields';
import z from 'zod';

export const loginSchema = z
  .object({
    email: zEmail,
    password: zPassword,
  })
  .strict();

export type LoginDto = z.infer<typeof loginSchema>;
