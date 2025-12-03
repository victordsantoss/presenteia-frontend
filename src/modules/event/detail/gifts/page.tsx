'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Link as MuiLink,
  Breadcrumbs,
} from '@mui/material'
import { ArrowBack as BackIcon, Save as SaveIcon } from '@mui/icons-material'
import Link from 'next/link'
import { GiftForm } from './components/GiftForm'
import { CreateGiftSchema, type CreateGiftFormValues } from './form.schema'
import { GiftService } from '@/services/client/gift.service'
import { CategoryService } from '@/services/client/category.service'
import { GiftPriority } from '@/services/domain/gift.types'
import { isAxiosError } from 'axios'

interface CreateGiftPageProps {
  eventId: string
  eventSlug: string
  eventTitle: string
}

export default function CreateGiftPage({ eventId, eventSlug, eventTitle }: CreateGiftPageProps) {
  const router = useRouter()
  const [apiError, setApiError] = useState<string | null>(null)

  const methods = useForm<CreateGiftFormValues>({
    resolver: zodResolver(CreateGiftSchema) as never,
    defaultValues: {
      name: '',
      description: '',
      price: undefined,
      quantity: 1,
      categoryId: '',
      priority: GiftPriority.MEDIUM,
      allowMultipleContributions: false,
      links: [],
      image: undefined,
    },
  })

  // Buscar categorias
  const {
    data: categoriesResponse,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getCategories(),
  })

  // Mutation para criar presente
  const { mutate: createGift, isPending } = useMutation({
    mutationFn: (payload: CreateGiftFormValues) => {
      const requestPayload = {
        name: payload.name,
        description: payload.description || undefined,
        price: payload.price,
        quantity: payload.quantity,
        categoryId: payload.categoryId || undefined,
        priority: payload.priority,
        allowMultipleContributions: payload.allowMultipleContributions,
        links: payload.links?.filter((link) => link.trim() !== ''),
        image: payload.image || undefined,
      }
      return GiftService.createGift(eventId, requestPayload)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setApiError(err.response?.data?.message || 'Erro ao criar presente')
      } else {
        setApiError('Erro ao criar presente')
      }
    },
    onSuccess: () => {
      setApiError(null)
      router.push(`/event/detail/${eventSlug}`)
    },
  })

  const handleSubmit = methods.handleSubmit((data) => {
    setApiError(null)
    createGift(data)
  })

  const handleCancel = () => {
    router.push(`/event/detail/${eventSlug}`)
  }

  const categories = categoriesResponse?.data || []

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={3}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link href="/" passHref legacyBehavior>
            <MuiLink color="inherit" underline="hover">
              Início
            </MuiLink>
          </Link>
          <Link href={`/event/detail/${eventSlug}`} passHref legacyBehavior>
            <MuiLink color="inherit" underline="hover">
              {eventTitle}
            </MuiLink>
          </Link>
          <Typography color="text.primary">Adicionar Presente</Typography>
        </Breadcrumbs>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Button
            startIcon={<BackIcon />}
            onClick={handleCancel}
            disabled={isPending}
            variant="outlined"
          >
            Voltar
          </Button>
        </Box>

        <Typography variant="h4" component="h1" fontWeight="bold">
          Adicionar Presente
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Preencha os detalhes do presente que deseja adicionar à sua lista
        </Typography>
      </Box>

      {apiError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setApiError(null)}>
          {apiError}
        </Alert>
      )}

      {categoriesError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Não foi possível carregar as categorias. Você ainda pode criar o presente sem categoria.
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>
        {isLoadingCategories ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
              <GiftForm methods={methods} categories={categories} isPending={isPending} />

              <Box display="flex" gap={2} mt={4} justifyContent="flex-end">
                <Button variant="outlined" onClick={handleCancel} disabled={isPending} size="large">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isPending}
                  startIcon={isPending ? <CircularProgress size={20} /> : <SaveIcon />}
                  size="large"
                >
                  {isPending ? 'Salvando...' : 'Salvar Presente'}
                </Button>
              </Box>
            </form>
          </FormProvider>
        )}
      </Paper>
    </Container>
  )
}
