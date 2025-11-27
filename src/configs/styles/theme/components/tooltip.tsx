import { ComponentsOverrides, Theme } from '@mui/material'

interface MyTooltipOverrides {
  MuiTooltip: {
    styleOverrides: ComponentsOverrides<Theme>['MuiTooltip']
  }
}

export const TooltipStyles: MyTooltipOverrides = {
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        fontSize: '0.875rem',
      }),
      arrow: ({ theme }) => ({
        color: theme.palette.primary.main,
      }),
    },
  },
}
