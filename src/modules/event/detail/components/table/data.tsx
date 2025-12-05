'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Box, LinearProgress, Alert, Snackbar, Typography } from '@mui/material'
import { CardGiftcard as GiftIcon } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Gift, GiftAvailabilityStatus } from '@/services/domain/gift.types'
import { GiftService } from '@/services/client/gift.service'
import { GiftReservationModal } from '../gift-reservation-modal'
import { Filter, OrderBy } from './filter'
import { CategoryTabs } from '../tabs'
import { EmptyState } from '@/components/empty-state'
import { GiftCard } from '@/components/gift-card'
import { SimpleLoading } from '@/components/loading/simple-loading'

interface IDataProps {
  eventId: string
  categories: Gift.IGetEventGiftCategoryResponse[]
}

const ITEMS_PER_PAGE = 8

export function Data({ eventId, categories }: IDataProps) {
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
    setCurrentPage(1)
    setHasMore(true)
    setGifts([])
    fetchGifts(buildPayload(1, false))
  }

  return (
    <>
      {/* Tabs */}
      <CategoryTabs
        selectedTab={selectedTab}
        categories={categories}
        onTabChange={handleTabChange}
      />

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
          <SimpleLoading text="Carregando presentes..." size={60} />
        </Box>
      ) : gifts?.length === 0 ? (
        <EmptyState
          icon={<GiftIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />}
          message="Nenhum presente encontrado nesta categoria"
        />
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
            {gifts?.map((gift) => (
              <GiftCard key={gift.id} gift={gift} onReserve={handleOpenReservationModal} />
            ))}
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
            {isLoadingMore && <SimpleLoading text="Carregando mais presentes..." />}
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
    </>
  )
}
