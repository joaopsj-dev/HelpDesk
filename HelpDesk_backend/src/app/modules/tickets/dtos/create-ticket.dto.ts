import { zName } from 'src/app/common/validation/validate-fields';
import { z } from 'zod';

export const createTicketSchema = z.object({
  title: zName.max(100),
  description: zName.max(2000),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
