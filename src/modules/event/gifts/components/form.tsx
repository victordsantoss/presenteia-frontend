import {
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  InputAdornment,
  Box,
  Divider,
} from '@mui/material'
import {
  CardGiftcard as GiftIcon,
  Description as DescriptionIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  PriorityHigh as PriorityIcon,
} from '@mui/icons-material'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { CreateGiftFormValues } from './form.schema'
import type { ICategoryItem } from '@/services/domain/category.types'
import { GiftPriority } from '@/services/domain/gift.types'
import { ImageUpload } from './image-upload'
import { LinksInput } from './links-input'

interface GiftFormProps {
  methods: UseFormReturn<CreateGiftFormValues>
  categories: ICategoryItem[]
  isPending: boolean
}

const priorityOptions = [
  { value: GiftPriority.LOW, label: 'Baixa' },
  { value: GiftPriority.MEDIUM, label: 'Média' },
  { value: GiftPriority.HIGH, label: 'Alta' },
]

export function GiftForm({ methods, categories, isPending }: GiftFormProps) {
  const {
    control,
    formState: { errors },
  } = methods

  return (
    <Stack spacing={3}>
      {/* Nome */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Nome do Presente"
            required
            placeholder="Ex: Jogo de Panelas Tramontina"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isPending}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GiftIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Descrição */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Descrição"
            multiline
            rows={3}
            placeholder="Descreva os detalhes do presente..."
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isPending}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                  <DescriptionIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
        {/* Preço */}
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Preço"
              type="number"
              placeholder="0.00"
              error={!!errors.price}
              helperText={errors.price?.message}
              disabled={isPending}
              value={field.value ?? ''}
              onChange={(e) => {
                const value = e.target.value
                field.onChange(value === '' ? undefined : parseFloat(value))
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Quantidade */}
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Quantidade"
              type="number"
              placeholder="1"
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              disabled={isPending}
              value={field.value ?? ''}
              onChange={(e) => {
                const value = e.target.value
                field.onChange(value === '' ? undefined : parseInt(value))
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>

      <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
        {/* Categoria */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.categoryId} disabled={isPending} required>
              <InputLabel>Categoria</InputLabel>
              <Select
                {...field}
                label="Categoria"
                value={field.value || ''}
                startAdornment={
                  <InputAdornment position="start">
                    <CategoryIcon color="action" />
                  </InputAdornment>
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.categoryId && <FormHelperText>{errors.categoryId.message}</FormHelperText>}
            </FormControl>
          )}
        />

        {/* Prioridade */}
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.priority} disabled={isPending}>
              <InputLabel>Prioridade</InputLabel>
              <Select
                {...field}
                label="Prioridade"
                value={field.value || GiftPriority.MEDIUM}
                startAdornment={
                  <InputAdornment position="start">
                    <PriorityIcon color="action" />
                  </InputAdornment>
                }
              >
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Box>

      {/* Permitir múltiplas contribuições */}
      <Controller
        name="allowMultipleContributions"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                disabled={isPending}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label="Permitir múltiplas contribuições (vaquinha)"
          />
        )}
      />

      <Divider />

      {/* Imagem */}
      <Box>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value || null}
              onChange={field.onChange}
              error={errors.image?.message}
              disabled={isPending}
            />
          )}
        />
      </Box>

      <Divider />

      {/* Links */}
      <LinksInput control={control} disabled={isPending} />
    </Stack>
  )
}
