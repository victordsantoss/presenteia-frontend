'use client'

import { useState } from 'react'
import { TextField, Stack, InputAdornment, IconButton, Link as MuiLink } from '@mui/material'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import {
  Controller,
  type UseFormReturn,
  type ControllerRenderProps,
  type FieldError,
} from 'react-hook-form'
import Link from 'next/link'
import type { LoginFormValues } from './form.schema'

interface ILoginFormProps {
  methods: UseFormReturn<LoginFormValues>
  isPending: boolean
}

export function LoginForm({ methods, isPending }: ILoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  function handleTogglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  }

  return (
    <Stack spacing={3}>
      {/* Email */}
      <Controller
        name="email"
        control={methods.control}
        render={({
          field,
          fieldState,
        }: {
          field: ControllerRenderProps<LoginFormValues, 'email'>
          fieldState: { error?: FieldError }
        }) => (
          <TextField
            {...field}
            fullWidth
            label="Email"
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

      {/* Password */}
      <Controller
        name="password"
        control={methods.control}
        render={({
          field,
          fieldState,
        }: {
          field: ControllerRenderProps<LoginFormValues, 'password'>
          fieldState: { error?: FieldError }
        }) => (
          <TextField
            {...field}
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Digite sua senha"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={isPending}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="alternar visibilidade da senha"
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    disabled={isPending}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Forgot Password Link */}
      <MuiLink
        component={Link}
        href="/forgot-password"
        underline="hover"
        sx={{
          alignSelf: 'flex-end',
          fontSize: '0.875rem',
          color: 'primary.main',
          '&:hover': {
            color: 'primary.dark',
          },
        }}
      >
        Esqueci minha senha
      </MuiLink>
    </Stack>
  )
}
