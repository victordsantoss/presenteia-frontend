'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Link as MuiLink,
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import Link from 'next/link'
import Image from 'next/image'
import { DecorativeCircle } from '@/components/decorative-circle'
import { LoginForm } from './components/form'
import { LoginSchema, type LoginFormValues } from './components/form.schema'

export function LoginPage() {
  const [isPending, setIsPending] = useState(false)

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSubmit(data: LoginFormValues) {
    setIsPending(true)
    try {
      // TODO: Implementar lógica de login
      console.log('Login data:', data)
      // Aqui você chamaria sua action de login
    } catch (error) {
      console.error('Erro no login:', error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        py: 4,
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DecorativeCircle size={200} top={-50} left={-50} color="primary.light" opacity={1} />
      <DecorativeCircle size={150} bottom={-40} right={-40} color="primary.light" opacity={1} />
      <DecorativeCircle size={120} top={100} right={50} color="secondary.light" opacity={0.6} />
      <DecorativeCircle size={180} bottom={150} left={100} color="primary.main" opacity={0.4} />
      <DecorativeCircle size={90} top={300} left={200} color="secondary.main" opacity={0.5} />
      <DecorativeCircle size={140} bottom={200} right={150} color="primary.light" opacity={0.7} />
      <DecorativeCircle size={100} top={50} right={250} color="secondary.light" opacity={0.8} />
      <DecorativeCircle size={160} bottom={80} left={50} color="primary.main" opacity={0.3} />
      <DecorativeCircle size={110} top={400} right={100} color="secondary.main" opacity={0.6} />
      <DecorativeCircle size={130} bottom={300} left={300} color="primary.light" opacity={0.5} />

      <Card
        sx={{
          maxWidth: 1200,
          width: '100%',
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              />
            }
            sx={{ minHeight: { xs: 'auto', md: 650 } }}
          >
            {/* Left Side - Image and Phrase */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 6,
                bgcolor: 'primary.main',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.1,
                  background:
                    'radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 2px, transparent 2px)',
                  backgroundSize: '60px 60px',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                {/* Icon or Logo Placeholder */}
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 4,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <LoginIcon sx={{ fontSize: 70, color: 'white' }} />
                </Box>

                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  Presenteia
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    maxWidth: 350,
                    mx: 'auto',
                    opacity: 0.95,
                    fontWeight: 300,
                    lineHeight: 1.6,
                    fontSize: '1.15rem',
                  }}
                >
                  Transforme momentos especiais em presentes inesquecíveis
                </Typography>
              </Box>
            </Box>

            {/* Right Side - Login Form */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 4, sm: 5, md: 6 },
              }}
            >
              <Box sx={{ maxWidth: 480, mx: 'auto', width: '100%' }}>
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mb: 1 }}
                >
                  Bem-vindo de volta!
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 4 }}>
                  Entre com suas credenciais para acessar sua conta
                </Typography>

                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                  <LoginForm methods={methods} isPending={isPending} />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isPending}
                    startIcon={<LoginIcon />}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {isPending ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>

                {/* Sign Up Link */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.primary">
                    Não tem uma conta?{' '}
                    <MuiLink
                      component={Link}
                      href="/register"
                      underline="hover"
                      fontWeight={600}
                      sx={{
                        color: 'primary.main',
                        '&:hover': {
                          color: 'primary.dark',
                        },
                      }}
                    >
                      Cadastre-se
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
