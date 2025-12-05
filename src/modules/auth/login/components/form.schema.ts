import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O email é obrigatório' })
    .email({ message: 'Insira um email válido' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'A senha é obrigatória' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .max(100, { message: 'A senha deve ter no máximo 100 caracteres' }),
})

export type LoginFormValues = z.infer<typeof LoginSchema>
