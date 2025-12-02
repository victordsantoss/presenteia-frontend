import { TextField, Stack, InputAdornment } from '@mui/material'
import { Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material'
import {
  Controller,
  type UseFormReturn,
  type ControllerRenderProps,
  type FieldError,
} from 'react-hook-form'
import type { GiftReservationFormValues } from './form.schema'

interface GiftReservationFormProps {
  methods: UseFormReturn<GiftReservationFormValues>
  isPending: boolean
}

export function GiftReservationForm({ methods, isPending }: GiftReservationFormProps) {
  return (
    <Stack spacing={2.5}>
      {/* Nome */}
      <Controller
        name="guestName"
        control={methods.control}
        render={({
          field,
          fieldState,
        }: {
          field: ControllerRenderProps<GiftReservationFormValues, 'guestName'>
          fieldState: { error?: FieldError }
        }) => (
          <TextField
            {...field}
            fullWidth
            label="Seu Nome"
            required
            placeholder="Digite seu nome completo"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={isPending}
            onBlur={(e) => field.onChange(e.target.value.trim())}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="guestEmail"
        control={methods.control}
        render={({
          field,
          fieldState,
        }: {
          field: ControllerRenderProps<GiftReservationFormValues, 'guestEmail'>
          fieldState: { error?: FieldError }
        }) => (
          <TextField
            {...field}
            fullWidth
            label="Seu Email"
            type="email"
            required
            placeholder="exemplo@email.com"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={isPending}
            onBlur={(e) => field.onChange(e.target.value.trim())}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Telefone */}
      <Controller
        name="guestPhone"
        control={methods.control}
        render={({
          field,
          fieldState,
        }: {
          field: ControllerRenderProps<GiftReservationFormValues, 'guestPhone'>
          fieldState: { error?: FieldError }
        }) => (
          <TextField
            {...field}
            fullWidth
            label="Seu Telefone"
            required
            placeholder="(11) 98765-4321"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={isPending}
            onBlur={(e) => field.onChange(e.target.value.trim())}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Mensagem */}
      <Controller
        name="message"
        control={methods.control}
        render={({
          field,
          fieldState,
        }: {
          field: ControllerRenderProps<GiftReservationFormValues, 'message'>
          fieldState: { error?: FieldError }
        }) => (
          <TextField
            {...field}
            fullWidth
            label="Mensagem (opcional)"
            multiline
            rows={3}
            placeholder="Deixe uma mensagem carinhosa..."
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={isPending}
          />
        )}
      />
    </Stack>
  )
}
