import { Box, Button, IconButton, TextField, Typography, Stack } from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, Link as LinkIcon } from '@mui/icons-material'
import { Control, FieldError, useWatch, useFormContext } from 'react-hook-form'
import type { CreateGiftFormValues } from '../form.schema'

interface LinksInputProps {
  control: Control<CreateGiftFormValues>
  error?: FieldError
  disabled?: boolean
}

export function LinksInput({ control, error, disabled }: LinksInputProps) {
  const { setValue } = useFormContext<CreateGiftFormValues>()
  const links = useWatch({ control, name: 'links' }) || []

  const handleAdd = () => {
    setValue('links', [...links, ''])
  }

  const handleRemove = (index: number) => {
    setValue(
      'links',
      links.filter((_, i) => i !== index)
    )
  }

  const handleChange = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setValue('links', newLinks)
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Links de Referência (opcional)
      </Typography>

      <Stack spacing={2}>
        {links.map((link, index) => (
          <Box key={index} display="flex" gap={1} alignItems="flex-start">
            <TextField
              fullWidth
              label={`Link ${index + 1}`}
              placeholder="https://exemplo.com/produto"
              disabled={disabled}
              value={link}
              onChange={(e) => handleChange(index, e.target.value)}
              InputProps={{
                startAdornment: <LinkIcon sx={{ mr: 1 }} color="action" />,
              }}
              error={!!error}
              helperText={error?.message}
            />
            <IconButton
              onClick={() => handleRemove(index)}
              disabled={disabled}
              color="error"
              sx={{ mt: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={disabled}
          sx={{ alignSelf: 'flex-start' }}
        >
          Adicionar Link
        </Button>
      </Stack>
    </Box>
  )
}
