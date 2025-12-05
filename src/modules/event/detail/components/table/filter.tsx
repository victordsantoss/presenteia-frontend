'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { GiftAvailabilityStatus } from '@/services/domain/gift.types'

export type OrderBy = 'none' | 'price_asc' | 'price_desc'

interface IFilterProps {
  onFilterChange: (filters: {
    search: string
    status: GiftAvailabilityStatus
    orderBy: OrderBy
  }) => void
}

export function Filter({ onFilterChange }: IFilterProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<GiftAvailabilityStatus>(GiftAvailabilityStatus.ALL)
  const [orderBy, setOrderBy] = useState<OrderBy>('none')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ search, status, orderBy })
    }, 500) // Debounce de 500ms para o search

    return () => clearTimeout(timeoutId)
  }, [search, status, orderBy, onFilterChange])

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  const handleStatusChange = useCallback((event: SelectChangeEvent) => {
    setStatus(event.target.value as GiftAvailabilityStatus)
  }, [])

  const handleOrderByChange = useCallback((event: SelectChangeEvent) => {
    setOrderBy(event.target.value as OrderBy)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 4,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <TextField
        fullWidth
        placeholder="Buscar presentes..."
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: 'background.paper',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />

      <FormControl
        sx={{
          minWidth: { xs: '100%', sm: 200 },
          bgcolor: 'background.paper',
        }}
      >
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value={GiftAvailabilityStatus.ALL}>Todos</MenuItem>
          <MenuItem value={GiftAvailabilityStatus.AVAILABLE}>Disponíveis</MenuItem>
          <MenuItem value={GiftAvailabilityStatus.RESERVED}>Reservados</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{
          minWidth: { xs: '100%', sm: 200 },
          bgcolor: 'background.paper',
        }}
      >
        <InputLabel id="order-by-filter-label">Ordenar Por</InputLabel>
        <Select
          labelId="order-by-filter-label"
          id="order-by-filter"
          value={orderBy}
          label="Ordenar Por"
          onChange={handleOrderByChange}
        >
          <MenuItem value="none">Nenhum</MenuItem>
          <MenuItem value="price_desc">Mais caro</MenuItem>
          <MenuItem value="price_asc">Mais barato</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
