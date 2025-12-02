'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Link as LinkIcon } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gift } from '@/services/domain/gift.types'
import { GiftService } from '@/services/client/gift.service'
import { formatCurrency } from '@/common/utils/format'
import { GiftReservationSchema, type GiftReservationFormValues } from './form.schema'
import { GiftReservationForm } from './Form'

interface GiftReservationModalProps {
  open: boolean
  onClose: () => void
  gift: Gift.IGiftItem | null
  onSuccess?: () => void
}

export function GiftReservationModal({
  open,
  onClose,
  gift,
  onSuccess,
}: GiftReservationModalProps) {
  const [apiError, setApiError] = useState<string | null>(null)

  const methods = useForm<GiftReservationFormValues>({
    resolver: zodResolver(GiftReservationSchema),
    defaultValues: {
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      message: '',
    },
    mode: 'onBlur',
  })

  const { mutate: reserveGift, isPending } = useMutation({
    mutationFn: (payload: Gift.IReserveGiftRequest) => GiftService.reserveGift(gift!.id, payload),
    onError: (err) => {
      if (isAxiosError(err)) {
        setApiError(err.response?.data?.message || 'Erro ao reservar presente')
      } else {
        setApiError('Erro ao reservar presente')
      }
    },
    onSuccess: () => {
      setApiError(null)
      handleClose()
      if (onSuccess) onSuccess()
    },
  })

  const handleClose = () => {
    methods.reset()
    setApiError(null)
    onClose()
  }

  const handleSubmit = (values: GiftReservationFormValues) => {
    setApiError(null)

    reserveGift({
      guestName: values.guestName,
      guestEmail: values.guestEmail,
      guestPhone: values.guestPhone,
      contributionAmount: gift?.price || 0,
      message: values.message || '',
    })
  }

  useEffect(() => {
    if (open) {
      methods.reset()
      setApiError(null)
    }
  }, [open, methods])

  if (!gift) return null

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : handleClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: { xs: '95%', sm: '90%' },
          maxWidth: { xs: '95%', sm: 600 },
          m: { xs: 1, sm: 4 },
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          pb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" component="div" fontWeight={700}>
            Reservar Presente
          </Typography>
          <Typography variant="body2" component="div" sx={{ mt: 0.5, opacity: 0.9 }}>
            {gift.name}
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <DialogContent sx={{ pt: 3 }}>
          {apiError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {apiError}
            </Alert>
          )}

          {/* Informações do Presente */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" color="text.primary" fontWeight={500}>
                Valor médio do presente
              </Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {formatCurrency(gift.price)}
              </Typography>
              <Typography variant="caption" color="text.primary" sx={{ fontStyle: 'italic' }}>
                Valor estimado com base em pesquisas realizadas. Este é apenas um valor de
                referência para compreensão do presente.
              </Typography>
            </Stack>
          </Box>

          {/* Links Sugeridos */}
          {gift.links && gift.links.length > 0 && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                bgcolor: 'primary.light',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="primary.dark"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <LinkIcon sx={{ fontSize: 20 }} />
                Links sugeridos para compra
              </Typography>
              <Stack spacing={1}>
                {gift.links.map((link) => (
                  <Button
                    key={link.id}
                    variant="outlined"
                    size="small"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontWeight: 600,
                      bgcolor: 'white',
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <LinkIcon sx={{ fontSize: 16, mr: 1 }} />
                    {new URL(link.url).hostname.replace('www.', '')}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}

          <GiftReservationForm methods={methods} isPending={isPending} />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1, flexDirection: { xs: 'column', md: 'row' } }} >
          <Button
            onClick={handleClose}
            disabled={isPending}
            variant="outlined"
            size="large"
            color="secondary"
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 140,
            }}
          >
            {isPending ? 'Reservando...' : 'Confirmar Reserva'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
