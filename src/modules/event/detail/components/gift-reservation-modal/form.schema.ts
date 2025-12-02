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
    .min(1, { message: 'O email é obrigatório' })
    .email('Insira um email válido')
    .trim(),
  guestPhone: z
    .string()
    .min(1, { message: 'O telefone é obrigatório' })
    .min(10, { message: 'O telefone deve ter no mínimo 10 caracteres' })
    .max(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
    .regex(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
      'Telefone inválido. Use o formato (11) 98765-4321'
    )
    .trim(),
  message: z
    .string()
    .max(500, { message: 'A mensagem deve ter no máximo 500 caracteres' })
    .optional(),
})

export type GiftReservationFormValues = z.infer<typeof GiftReservationSchema>

