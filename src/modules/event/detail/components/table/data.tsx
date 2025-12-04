'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
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
  Tooltip,
  IconButton,
} from '@mui/material'
import {
  CardGiftcard as GiftIcon,
  CheckCircle as CheckIcon,
  TrendingUp as PriorityIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Gift, GiftAvailabilityStatus } from '@/services/domain/gift.types'
import { formatCurrency } from '@/common/utils/format'
import { GiftService } from '@/services/client/gift.service'
import { GiftReservationModal } from '../gift-reservation-modal'
import { Filter, OrderBy } from './filter'

interface DataProps {
  eventId: string
  categories: Gift.IGetEventGiftCategoryResponse[]
}

const ITEMS_PER_PAGE = 8

export function Data({ eventId, categories }: DataProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [gifts, setGifts] = useState<Gift.IGiftItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedGift, setSelectedGift] = useState<Gift.IGiftItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState<{
    search: string
    status: GiftAvailabilityStatus
    orderBy: OrderBy
  }>({
    search: '',
    status: GiftAvailabilityStatus.ALL,
    orderBy: 'none',
  })

  const { mutate: fetchGifts, isPending } = useMutation({
    mutationFn: (payload?: Partial<Gift.IGetGiftListRequest> & { isLoadMore?: boolean }) =>
      GiftService.getGiftList(eventId, {
        limit: ITEMS_PER_PAGE,
        page: 1,
        ...payload,
      }),
    onError: (err) => {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao buscar presentes')
      } else {
        setError('Erro ao buscar presentes')
      }
      setIsLoadingMore(false)
    },
    onSuccess: (response, variables) => {
      const isLoadMore = variables?.isLoadMore ?? false

      if (isLoadMore) {
        // Append new items to existing list
        setGifts((prevGifts) => [...prevGifts, ...response.data])
      } else {
        // Replace list with new data (filter change or initial load)
        setGifts(response.data)
      }

      // Check if there are more pages
      const { page, totalPages } = response.meta
      setHasMore(page < totalPages)
      setCurrentPage(page)
      setError(null)
      setIsLoadingMore(false)
    },
  })

  // Helper function to build payload
  const buildPayload = useCallback(
    (page: number, isLoadMore = false) => {
      const categoryId = selectedTab === 0 ? undefined : categories[selectedTab - 1]?.id
      const getOrderByParams = () => {
        if (filters.orderBy === 'price_desc')
          return { orderBy: 'price' as const, sortBy: 'DESC' as const }
        if (filters.orderBy === 'price_asc')
          return { orderBy: 'price' as const, sortBy: 'ASC' as const }
        return { orderBy: undefined, sortBy: undefined }
      }

      const { orderBy, sortBy } = getOrderByParams()

      return {
        categoryId,
        search: filters.search || undefined,
        status: filters.status !== GiftAvailabilityStatus.ALL ? filters.status : undefined,
        orderBy,
        sortBy,
        page,
        isLoadMore,
      }
    },
    [filters, selectedTab, categories]
  )

  // Busca presentes quando filtros ou categoria mudam (reseta para página 1)
  useEffect(() => {
    setCurrentPage(1)
    setHasMore(true)
    setGifts([])
    fetchGifts(buildPayload(1, false))
  }, [filters, selectedTab])

  // Função para carregar mais itens
  const loadMore = useCallback(() => {
    if (isPending || isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    const nextPage = currentPage + 1
    fetchGifts(buildPayload(nextPage, true))
  }, [isPending, isLoadingMore, hasMore, currentPage, buildPayload, fetchGifts])

  // IntersectionObserver para detectar quando o usuário chega ao final da lista
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isPending && !isLoadingMore) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasMore, isPending, isLoadingMore, loadMore])

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }, [])

  const handleFilterChange = useCallback(
    (newFilters: { search: string; status: GiftAvailabilityStatus; orderBy: OrderBy }) => {
      setFilters(newFilters)
    },
    []
  )

  const handleOpenReservationModal = (gift: Gift.IGiftItem) => {
    setSelectedGift(gift)
    setIsModalOpen(true)
  }

  const handleCloseReservationModal = () => {
    setIsModalOpen(false)
    setSelectedGift(null)
  }

  const handleReservationSuccess = () => {
    setShowSuccessMessage(true)
    // Reseta a paginação e força recarga dos filtros atuais
    setCurrentPage(1)
    setHasMore(true)
    setGifts([])
    fetchGifts(buildPayload(1, false))
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
      <Container maxWidth="xl">
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

        {/* Filtros */}
        <Filter onFilterChange={handleFilterChange} />

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
            <GiftIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" color="text.primary">
              Nenhum presente encontrado nesta categoria
            </Typography>
          </Box>
        ) : (
          <>
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
                            backgroundColor: 'white',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
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
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={600}>
                              Preço médio: {formatCurrency(gift.price)}
                            </Typography>
                            <Tooltip
                              title="Valor estimado com base em pesquisas realizadas. Este é apenas um valor de referência para compreensão do presente."
                              arrow
                              placement="top"
                              componentsProps={{
                                tooltip: {
                                  sx: {
                                    backgroundColor: 'info.main',
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    '& .MuiTooltip-arrow': {
                                      color: 'info.main',
                                    },
                                  },
                                },
                              }}
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  p: 0,
                                  ml: 0.5,
                                  '&:hover': { bgcolor: 'transparent' },
                                }}
                              >
                                <InfoIcon sx={{ fontSize: 16, color: 'info.main' }} />
                              </IconButton>
                            </Tooltip>
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

            {/* Elemento de trigger para infinite scroll */}
            <Box
              ref={loadMoreRef}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4,
                minHeight: 80,
              }}
            >
              {isLoadingMore && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'column' }}
                >
                  <CircularProgress color="secondary" size={32} />
                  <Typography variant="body2" color="text.primary">
                    Carregando mais presentes...
                  </Typography>
                </Box>
              )}
              {!hasMore && gifts.length > 0 && (
                <Typography variant="body2" color="text.primary">
                  Você chegou ao final da lista
                </Typography>
              )}
            </Box>
          </>
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
