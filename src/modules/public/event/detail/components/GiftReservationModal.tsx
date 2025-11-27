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
  AttachMoney as MoneyIcon,
  Message as MessageIcon,
} from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Gift } from '@/services/domain/gift.types'
import { GiftService } from '@/services/client/gift.service'
import { formatCurrency } from '@/common/utils/format'

interface GiftReservationModalProps {
  open: boolean
  onClose: () => void
  gift: Gift.IGetGiftListResponse | null
  onSuccess?: () => void
}

export function GiftReservationModal({ open, onClose, gift, onSuccess }: GiftReservationModalProps) {
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    contributionAmount: '',
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
      contributionAmount: '',
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

    if (!formData.contributionAmount) {
      newErrors.contributionAmount = 'Valor é obrigatório'
    } else {
      const amount = parseFloat(formData.contributionAmount)
      if (isNaN(amount) || amount <= 0) {
        newErrors.contributionAmount = 'Valor inválido'
      } else if (gift && amount > gift.price) {
        newErrors.contributionAmount = `Valor não pode ser maior que ${formatCurrency(gift.price)}`
      }
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
      contributionAmount: parseFloat(formData.contributionAmount),
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
              <Typography variant="body2" color="text.primary">
                Valor do presente
              </Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {formatCurrency(gift.price)}
              </Typography>
              {gift.allowMultipleContributions && (
                <Typography variant="caption" color="text.secondary">
                  Este presente aceita contribuições parciais
                </Typography>
              )}
            </Stack>
          </Box>

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

            {/* Valor da Contribuição */}
            <TextField
              fullWidth
              label="Valor da Contribuição"
              type="number"
              required
              value={formData.contributionAmount}
              onChange={(e) => setFormData({ ...formData, contributionAmount: e.target.value })}
              error={!!errors.contributionAmount}
              helperText={errors.contributionAmount || `Valor máximo: ${formatCurrency(gift.price)}`}
              disabled={isPending}
              inputProps={{
                min: 0,
                max: gift.price,
                step: 0.01,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon color="action" />
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

