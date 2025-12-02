'use client'

import { Box, CircularProgress, Typography } from '@mui/material'

export default function PageLoadingComponent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <CircularProgress sx={{ color: 'secondary.main' }} size={120} />
      <Typography variant="h6" color="text.primary">
        Carregando...
      </Typography>
    </Box>
  )
}
