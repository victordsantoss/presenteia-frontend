import { z } from 'zod'
import { GiftPriority } from '@/services/domain/gift.types'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export const CreateGiftSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome é obrigatório' })
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    .max(255, { message: 'O nome deve ter no máximo 255 caracteres' })
    .trim(),
  description: z
    .string()
    .max(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
    .optional()
    .or(z.literal('')),
  price: z
    .number({ message: 'Preço deve ser um número' })
    .min(0, { message: 'Preço deve ser maior ou igual a 0' })
    .optional()
    .or(z.nan())
    .transform((val) => (isNaN(val as number) ? undefined : val)),
  quantity: z
    .number({ message: 'Quantidade deve ser um número' })
    .int({ message: 'Quantidade deve ser um número inteiro' })
    .min(1, { message: 'Quantidade mínima é 1' })
    .optional()
    .or(z.nan())
    .transform((val) => (isNaN(val as number) ? undefined : val)),
  categoryId: z.string().min(1, { message: 'A categoria é obrigatória' }),
  priority: z.nativeEnum(GiftPriority).optional(),
  allowMultipleContributions: z.boolean().default(false),
  links: z
    .array(z.string().url({ message: 'URL inválida' }))
    .optional()
    .default([]),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'A imagem deve ter no máximo 5MB',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Apenas imagens JPEG, PNG, WebP ou GIF são aceitas',
    })
    .optional()
    .or(z.null())
    .transform((val) => (val === null ? undefined : val)),
})

export type CreateGiftFormValues = z.infer<typeof CreateGiftSchema>
