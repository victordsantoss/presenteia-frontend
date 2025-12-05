import { z } from 'zod'

export const GiftReservationSchema = z.object({
  guestName: z
    .string()
    .min(1, { message: 'O nome é obrigatório' })
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres' })
    .trim(),
  guestEmail: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val === '' || z.string().email().safeParse(val).success, {
      message: 'Insira um email válido',
    })
    .transform((val) => val || ''),
  guestPhone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) =>
        !val ||
        val === '' ||
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/.test(
          val
        ),
      { message: 'Telefone inválido. Use o formato (11) 98765-4321' }
    )
    .transform((val) => val || ''),
  message: z
    .string()
    .max(500, { message: 'A mensagem deve ter no máximo 500 caracteres' })
    .optional()
    .transform((val) => val || ''),
})

export type GiftReservationFormValues = z.infer<typeof GiftReservationSchema>
