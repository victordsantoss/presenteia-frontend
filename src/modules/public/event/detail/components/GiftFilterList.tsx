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

interface GiftFilterListProps {
  onFilterChange: (filters: {
    search: string
    status: GiftAvailabilityStatus
  }) => void
}

export function GiftFilterList({ onFilterChange }: GiftFilterListProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<GiftAvailabilityStatus>(GiftAvailabilityStatus.ALL)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ search, status })
    }, 500) // Debounce de 500ms para o search

    return () => clearTimeout(timeoutId)
  }, [search, status, onFilterChange])

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  const handleStatusChange = useCallback((event: SelectChangeEvent) => {
    setStatus(event.target.value as GiftAvailabilityStatus)
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
    </Box>
  )
}

