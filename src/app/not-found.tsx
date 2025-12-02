'use client'

import { Box, Typography, Button, Stack } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home'

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 4,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: 250, md: 350 },
          height: { xs: 250, md: 350 },
          mb: 4,
        }}
      >
        <Image
          src="/not-found.png"
          alt="Página não encontrada"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>

      <Typography 
        variant="h3" 
        component="h1"
        gutterBottom 
        textAlign="center"
        fontWeight="bold"
        color="text.primary"
      >
        Página não encontrada
      </Typography>

      <Typography 
        variant="body1" 
        color="text.secondary" 
        textAlign="center" 
        mb={4}
        sx={{ maxWidth: 500 }}
      >
        Ops! Parece que essa página não existe ou foi movida. Mas não se preocupe, 
        temos muitas outras coisas incríveis para você descobrir!
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button 
          component={Link} 
          href="/" 
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
        >
          Voltar para Home
        </Button>
      </Stack>

      <Box sx={{ mt: 6, opacity: 0.3, fontSize: '3rem' }}>
        🎁 🎉 🎈
      </Box>
    </Box>
  )
}

