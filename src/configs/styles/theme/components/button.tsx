import { ComponentsOverrides, Theme } from '@mui/material'
import defaultTheme from '../default-theme'

interface MyButtonOverrides {
  MuiButton: {
    styleOverrides: ComponentsOverrides<Theme>['MuiButton']
  }
}

export const ButtonStyles: MyButtonOverrides = {
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        fontWeight: 600,
        padding: '8px 16px',
        minWidth: '160px ',
        borderRadius: '10px',
        ...(ownerState.variant === 'contained' &&
          ownerState.color === 'primary' && {
            backgroundColor: defaultTheme.palette.primary.light,
            color: defaultTheme.palette.primary.main,
            '&:hover': {
              color: defaultTheme.palette.primary.light,
              backgroundColor: defaultTheme.palette.primary.main,
            },
          }),

        ...(ownerState.variant === 'contained' &&
          ownerState.color === 'secondary' && {
            backgroundColor: defaultTheme.palette.secondary.main,
            color: defaultTheme.palette.secondary.contrastText,
            '&:hover': {
              backgroundColor: defaultTheme.palette.secondary.light,
            },
          }),

        ...(ownerState.variant === 'outlined' &&
          ownerState.color === 'primary' && {
            backgroundColor: defaultTheme.palette.primary.light,
            color: defaultTheme.palette.primary.main,
            '&:hover': {
              color: defaultTheme.palette.primary.light,
              backgroundColor: defaultTheme.palette.primary.main,
            },
          }),

        ...(ownerState.variant === 'outlined' &&
          ownerState.color === 'secondary' && {
            borderColor: defaultTheme.palette.secondary.main,
            color: defaultTheme.palette.secondary.contrastText,
            '&:hover': {
              borderColor: defaultTheme.palette.secondary.main,
              backgroundColor: 'transparent',
              color: defaultTheme.palette.secondary.dark,
            },
          }),
      }),
    },
  },
}
