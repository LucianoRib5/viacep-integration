import { z } from 'zod';

export const cepParamSchema = z.object({
  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, 'Invalid CEP format. Expected 00000-000 or 00000000')
    .transform((val) => {
      const digits = val.replace(/\D/g, '');
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    })
    .refine((val) => /^\d{5}-\d{3}$/.test(val), {
      message: 'CEP must contain exactly 8 digits formatted as 00000-000',
    }),
});
