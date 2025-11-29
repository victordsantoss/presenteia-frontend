'use client'

import { Box, Container, Typography, Link as MuiLink, IconButton, Divider } from '@mui/material'
import Link from 'next/link'
import { companyInfo, quickLinks, supportLinks, socialLinks, footerBottomLinks } from './items'
import { DisabledTooltip } from '@/components/DisabledTooltip'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'secondary.light',
        color: 'primary.contrastText',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
          }}
        >
          {/* Sobre a Empresa */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              {companyInfo.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
              {companyInfo.description}
            </Typography>
          </Box>

          {/* Links Rápidos */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: 'inherit',
                    opacity: 0.8,
                    textDecoration: 'none',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Box>

          {/* Suporte */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Suporte
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {supportLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: 'inherit',
                    opacity: 0.8,
                    textDecoration: 'none',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Box>

          {/* Redes Sociais */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              {companyInfo.socialTitle}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
              {companyInfo.socialDescription}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <DisabledTooltip key={social.label} title="Em breve!">
                    <IconButton
                      aria-label={social.label}
                      component="button"
                      sx={{
                        color: 'primary.contrastText',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                        },
                      }}
                    >
                      <IconComponent />
                    </IconButton>
                  </DisabledTooltip>
                )
              })}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright e Links Inferiores */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }} suppressHydrationWarning>
            © {currentYear} {companyInfo.name}. Todos os direitos reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {footerBottomLinks.map((link) => (
              <MuiLink
                key={link.href}
                component={Link}
                href={link.href}
                variant="body2"
                sx={{
                  color: 'inherit',
                  opacity: 0.7,
                  textDecoration: 'none',
                  '&:hover': { opacity: 1 },
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
