'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Stack,
  LinearProgress,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material'
import {
  CardGiftcard as GiftIcon,
  CheckCircle as CheckIcon,
  LocalOffer as PriceIcon,
  Inventory as QuantityIcon,
  TrendingUp as PriorityIcon,
} from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Gift } from '@/services/domain/gift.types'
import { formatCurrency } from '@/common/utils/format'
import { GiftService } from '@/services/client/gift.service'
import { GiftReservationModal } from './GiftReservationModal'

interface GiftListProps {
  eventId: string
  categories: Gift.IGetEventGiftCategoryResponse[]
}

// Cache de presentes por categoria
const giftsCache = new Map<string, Gift.IGetGiftListResponse[]>()

export function GiftList({ eventId, categories }: GiftListProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [gifts, setGifts] = useState<Gift.IGetGiftListResponse[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedGift, setSelectedGift] = useState<Gift.IGetGiftListResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const { mutate: fetchGifts, isPending } = useMutation({
    mutationFn: (payload?: { categoryId?: string }) => GiftService.getGiftList(eventId, payload),
    onError: (err) => {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao buscar presentes')
      } else {
        setError('Erro ao buscar presentes')
      }
    },
    onSuccess: (data, variables) => {
      const cacheKey = variables?.categoryId || 'all'
      giftsCache.set(cacheKey, data)
      setGifts(data)
      setError(null)
    },
  })

  // Busca inicial - todos os presentes
  useEffect(() => {
    if (!giftsCache.has('all')) {
      fetchGifts(undefined)
    } else {
      setGifts(giftsCache.get('all')!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue)

      const categoryId = newValue === 0 ? undefined : categories[newValue - 1].id
      const cacheKey = categoryId || 'all'

      // Verificar cache primeiro
      if (giftsCache.has(cacheKey)) {
        setGifts(giftsCache.get(cacheKey)!)
        return
      }

      // Buscar do servidor
      fetchGifts({ categoryId })
    },
    [categories, fetchGifts]
  )

  const handleOpenReservationModal = (gift: Gift.IGetGiftListResponse) => {
    setSelectedGift(gift)
    setIsModalOpen(true)
  }

  const handleCloseReservationModal = () => {
    setIsModalOpen(false)
    setSelectedGift(null)
  }

  const handleReservationSuccess = () => {
    setShowSuccessMessage(true)
    // Limpar cache e recarregar presentes
    giftsCache.clear()
    fetchGifts(selectedTab === 0 ? undefined : { categoryId: categories[selectedTab - 1].id })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#FF4757'
      case 'medium':
        return '#FFC312'
      case 'low':
        return '#70A1FF'
      default:
        return '#95a5a6'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'Alta'
      case 'medium':
        return 'Média'
      case 'low':
        return 'Baixa'
      default:
        return priority
    }
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Título */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              color: 'primary.dark',
              mb: 2,
            }}
          >
            Lista de Presentes
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'text.primary',
              lineHeight: 1.7,
            }}
          >
            Escolha um presente especial para contribuir
          </Typography>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 4,
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: { xs: 'auto', sm: 120 },
                color: 'secondary.main',
                '&.Mui-selected': {
                  color: 'secondary.dark',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            <Tab label="Todos" />
            {categories.map((category) => (
              <Tab key={category.id} label={category.name} />
            ))}
          </Tabs>
        </Box>

        {/* Loading */}
        {isPending && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress color="secondary" />
          </Box>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Lista de Presentes */}
        {isPending && gifts?.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 10,
            }}
          >
            <CircularProgress color="secondary" size={60} />
          </Box>
        ) : gifts?.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <GiftIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Nenhum presente encontrado nesta categoria
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {gifts?.map((gift) => {
              const progressPercentage = gift.price > 0 ? (gift.totalContributed / gift.price) * 100 : 0

              return (
                <Box key={gift.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 4,
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {/* Imagem */}
                    <Box
                      sx={{
                        width: '100%',
                        height: 200,
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: 'grey.100',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={gift.imageUrl || '/images/Image-not-found.png'}
                        alt={gift.name}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/images/Image-not-found.png'
                        }}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Categoria e Prioridade */}
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          label={gift.category}
                          size="small"
                          sx={{
                            bgcolor: 'primary.light',
                            color: 'primary.dark',
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          icon={<PriorityIcon sx={{ fontSize: 16 }} />}
                          label={getPriorityLabel(gift.priority)}
                          size="small"
                          sx={{
                            bgcolor: `${getPriorityColor(gift.priority)}15`,
                            color: getPriorityColor(gift.priority),
                            fontWeight: 600,
                          }}
                        />
                      </Stack>

                      {/* Nome */}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: 'primary.dark',
                          mb: 1,
                        }}
                      >
                        {gift.name}
                      </Typography>

                      {/* Descrição */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.primary',
                          lineHeight: 1.6,
                          mb: 2,
                          flexGrow: 1,
                        }}
                      >
                        {gift.description}
                      </Typography>

                      {/* Preço e Quantidade */}
                      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                          <Typography variant="body2" fontWeight={600}>
                            Preço médio: {formatCurrency(gift.price)}
                          </Typography>
                          <PriceIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        </Box>
                      </Stack>
                    
                      {/* Botão */}
                      <Button
                        variant={gift.isAvailable ? 'contained' : 'outlined'}
                        fullWidth
                        disabled={!gift.isAvailable}
                        startIcon={gift.isAvailable ? <GiftIcon /> : <CheckIcon />}
                        onClick={() => gift.isAvailable && handleOpenReservationModal(gift)}
                        color="success"
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        {gift.isAvailable ? 'Reservar Presente' : 'Já Reservado'}
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              )
            })}
          </Box>
        )}

        {/* Modal de Reserva */}
        <GiftReservationModal
          open={isModalOpen}
          onClose={handleCloseReservationModal}
          gift={selectedGift}
          onSuccess={handleReservationSuccess}
        />

        {/* Mensagem de Sucesso */}
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={6000}
          onClose={() => setShowSuccessMessage(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowSuccessMessage(false)}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Presente reservado com sucesso! 🎁
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

