'use client'
import { createTheme } from '@mui/material/styles'
import { ButtonStyles } from './components/button'
import { TypographyStyles } from './components/typography'
import { TextFieldStyles } from './components/input-field'
import { TooltipStyles } from './components/tooltip'
import { CardStyles } from './components/card'

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#ffebd4',
      main: '#DF9835',
      dark: '#B6894A',
      contrastText: '#1B1F27',
    },
    secondary: {
      light: '#ffebd4',
      main: '#006A9F',
      dark: '#B6894A',
      contrastText: '#FAFAFA',
    },
    background: {
      default: '#FAFAFA',
      paper: '#F1F1F1',
    },
    text: {
      primary: '#1B1F27',
      secondary: '#FAFAFA',
    },
    auxiliares: {
      black: '#111111',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    ...TextFieldStyles,
    ...ButtonStyles,
    ...CardStyles,
    ...TypographyStyles,
    ...TooltipStyles,
  },
})

export default defaultTheme
