import { Box, Button, Typography, IconButton, FormHelperText } from '@mui/material'
import { CloudUpload as UploadIcon, Close as CloseIcon } from '@mui/icons-material'
import { useRef, useState } from 'react'
import Image from 'next/image'

interface IImageUploadProps {
  value: File | null
  onChange: (file: File | null) => void
  error?: string
  disabled?: boolean
}

export function ImageUpload({ onChange, error, disabled }: IImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onChange(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    onChange(null)
    setPreview(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {preview ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            height: 250,
            borderRadius: 2,
            overflow: 'hidden',
            border: error ? '2px solid' : '2px solid',
            borderColor: error ? 'error.main' : 'divider',
          }}
        >
          <Image src={preview} alt="Preview" fill style={{ objectFit: 'cover' }} />
          {!disabled && (
            <IconButton
              onClick={handleRemove}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'background.default',
                },
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      ) : (
        <Button
          variant="outlined"
          onClick={handleClick}
          disabled={disabled}
          startIcon={<UploadIcon />}
          sx={{
            width: '100%',
            maxWidth: 400,
            height: 250,
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: error ? 'error.main' : 'divider',
            '&:hover': {
              borderStyle: 'dashed',
              borderWidth: 2,
            },
          }}
        >
          <Box textAlign="center">
            <Typography variant="body1" gutterBottom>
              Clique para selecionar uma imagem
            </Typography>
            <Typography variant="caption" color="text.secondary">
              JPEG, PNG, WebP ou GIF (máx. 5MB)
            </Typography>
          </Box>
        </Button>
      )}

      {error && (
        <FormHelperText error sx={{ mt: 1 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  )
}
