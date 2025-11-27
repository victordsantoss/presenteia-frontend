import { ComponentsOverrides, Theme } from '@mui/material'

interface MyTypographyOverrides {
  MuiTypography: {
    styleOverrides: ComponentsOverrides<Theme>['MuiTypography']
  }
}

export const TypographyStyles: MyTypographyOverrides = {
  MuiTypography: {
    styleOverrides: {
      root: {
        lineHeight: 1.5,
        letterSpacing: '0.02em',
      },
      h1: {
        fontSize: 'clamp(2.5rem, 5vw, 3rem)',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: 'clamp(2rem, 4.5vw, 2.5rem)',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: 'clamp(1.75rem, 4vw, 2rem)',
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: 'clamp(1.5rem, 3.5vw, 1.75rem)',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.7,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
      },
    },
  },
}
