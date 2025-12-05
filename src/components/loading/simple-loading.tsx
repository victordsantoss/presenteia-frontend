import { Box, CircularProgress, Typography } from '@mui/material'

interface SimpleLoadingProps {
  text?: string
  size?: number
}

export function SimpleLoading({ text, size = 32 }: SimpleLoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexDirection: 'column',
      }}
    >
      <CircularProgress color="secondary" size={size} />
      {text && (
        <Typography variant="body2" color="text.primary">
          {text}
        </Typography>
      )}
    </Box>
  )
}
