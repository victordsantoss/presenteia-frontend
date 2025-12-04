'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  Link as LinkIcon,
} from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Gift } from '@/services/domain/gift.types'
import { GiftService } from '@/services/client/gift.service'
import { formatCurrency } from '@/common/utils/format'

interface GiftReservationModalProps {
  open: boolean
  onClose: () => void
  gift: Gift.IGiftItem | null
  onSuccess?: () => void
}

export function GiftReservationModal({ open, onClose, gift, onSuccess }: GiftReservationModalProps) {
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState<string | null>(null)

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
    setFormData({
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      message: '',
    })
    setErrors({})
    setApiError(null)
    onClose()
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Nome é obrigatório'
    }

    if (!formData.guestEmail.trim()) {
      newErrors.guestEmail = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guestEmail)) {
      newErrors.guestEmail = 'Email inválido'
    }

    if (!formData.guestPhone.trim()) {
      newErrors.guestPhone = 'Telefone é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)

    if (!validateForm()) return

    reserveGift({
      guestName: formData.guestName,
      guestEmail: formData.guestEmail,
      guestPhone: formData.guestPhone,
      contributionAmount: gift?.price || 0,
      message: formData.message,
    })
  }

  if (!gift) return null

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
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

      <form onSubmit={handleSubmit}>
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
                Valor estimado com base em pesquisas realizadas. Este é apenas um valor de referência para compreensão do presente.
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

          <Stack spacing={2.5}>
            {/* Nome */}
            <TextField
              fullWidth
              label="Seu Nome"
              required
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              error={!!errors.guestName}
              helperText={errors.guestName}
              disabled={isPending}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Seu Email"
              type="email"
              required
              value={formData.guestEmail}
              onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
              error={!!errors.guestEmail}
              helperText={errors.guestEmail}
              disabled={isPending}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Telefone */}
            <TextField
              fullWidth
              label="Seu Telefone"
              required
              value={formData.guestPhone}
              onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
              error={!!errors.guestPhone}
              helperText={errors.guestPhone}
              disabled={isPending}
              placeholder="(11) 98765-4321"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Mensagem */}
            <TextField
              fullWidth
              label="Mensagem (opcional)"
              multiline
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={isPending}
              placeholder="Deixe uma mensagem carinhosa..."
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleClose}
            disabled={isPending}
            variant="outlined"
            size="large"
            color="secondary"
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

