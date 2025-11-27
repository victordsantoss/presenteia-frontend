import { ComponentsOverrides, Theme } from '@mui/material'
import defaultTheme from '../default-theme'

interface MyCardOverrides {
  MuiCard: {
    styleOverrides: ComponentsOverrides<Theme>['MuiCard']
  }
}

export const CardStyles: MyCardOverrides = {
  MuiCard: {
    styleOverrides: {
      root: () => ({
        backgroundColor: defaultTheme.palette.background.default,
        transition: 'all 0.2s ease-in-out',
        color: defaultTheme.palette.text.primary,
        border: `1px solid ${defaultTheme.palette.primary.light}`,
        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }),
    },
  },
}
