import { ComponentsOverrides, Theme, alpha } from '@mui/material'

interface TextFieldOverrides {
  MuiInputBase: {
    styleOverrides: ComponentsOverrides<Theme>['MuiInputBase']
  }
  MuiFilledInput: {
    styleOverrides: ComponentsOverrides<Theme>['MuiFilledInput']
  }
  MuiOutlinedInput: {
    styleOverrides: ComponentsOverrides<Theme>['MuiOutlinedInput']
  }
  MuiInputLabel: {
    styleOverrides: ComponentsOverrides<Theme>['MuiInputLabel']
  }
  MuiAutocomplete: {
    styleOverrides: ComponentsOverrides<Theme>['MuiAutocomplete']
  }
  MuiSwitch: {
    styleOverrides: ComponentsOverrides<Theme>['MuiSwitch']
  }
}

export const TextFieldStyles: TextFieldOverrides = {
  MuiInputBase: {
    styleOverrides: {
      input: ({ theme }) => ({
        color: 'text.primary !important',
        '&::placeholder': {
          color: `${alpha(theme.palette.text.primary, 0.6)} !important`,
          opacity: '1 !important',
        },
      }),
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'text.primary',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
        '&.Mui-focused': {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderBottomColor: `${theme.palette.primary.main} !important`,
        },
        '&:after': {
          borderBottomColor: `${theme.palette.primary.main} !important`,
        },
      }),
      input: ({ theme }) => ({
        color: 'text.primary !important',
        '&::placeholder': {
          color: `${alpha(theme.palette.text.primary, 0.6)} !important`,
          opacity: '1 !important',
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.palette.divider} !important`,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
        },
      }),
      input: ({ theme }) => ({
        color: 'text.primary !important',
        '&::placeholder': {
          color: `${alpha(theme.palette.text.primary, 0.6)} !important`,
          opacity: '1 !important',
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: `${theme.palette.text.primary} !important`,
        '&.Mui-focused': {
          color: `${theme.palette.text.primary} !important`,
        },
        '&.MuiFormLabel-filled': {
          color: `${theme.palette.text.primary} !important`,
        },
        '&.Mui-error': {
          color: `${theme.palette.text.primary} !important`,
        },
        '&.Mui-disabled': {
          color: `${theme.palette.text.primary} !important`,
        },
        '&.MuiInputLabel-shrink': {
          color: `${theme.palette.text.primary} !important`,
        },
        '&.MuiInputLabel-outlined': {
          color: `${theme.palette.text.primary} !important`,
        },
        '&.MuiInputLabel-filled': {
          color: `${theme.palette.text.primary} !important`,
        },
        '&.MuiInputLabel-standard': {
          color: `${theme.palette.text.primary} !important`,
        },
      }),
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiAutocomplete-popupIndicator': {
          color: `${theme.palette.text.primary} !important`,
        },
        '& .MuiAutocomplete-clearIndicator': {
          color: `${theme.palette.text.primary} !important`,
        },
      }),
      option: ({ theme }) => ({
        color: `${theme.palette.text.primary} !important`,
        '&:hover': {
          backgroundColor: theme.palette.background.default,
        },
        '&.Mui-focused': {
          backgroundColor: theme.palette.background.default,
        },
        '&[aria-selected="true"]': {
          backgroundColor: `${theme.palette.background.default} !important`,
          color: `${theme.palette.text.primary} !important`,
        },
      }),
      paper: ({ theme }) => ({
        backgroundColor: `${theme.palette.background.default} !important`,
        boxShadow: theme.shadows[8],
      }),
      listbox: ({ theme }) => ({
        padding: 0,
        '& .MuiAutocomplete-option': {
          minHeight: 48,
          padding: theme.spacing(1, 2),
        },
      }),
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiSwitch-switchBase': {
          color: `${theme.palette.text.primary} !important`,
          '&.Mui-checked': {
            color: `${theme.palette.text.primary} !important`,
            '& + .MuiSwitch-track': {
              backgroundColor: `${alpha(theme.palette.text.primary, 0.5)} !important`,
            },
          },
          '&:hover': {
            backgroundColor: `${alpha(theme.palette.text.primary, 0.04)} !important`,
          },
          '&.Mui-checked:hover': {
            backgroundColor: `${alpha(theme.palette.text.primary, 0.04)} !important`,
          },
          '&.Mui-disabled': {
            color: `${alpha(theme.palette.text.primary, 0.3)} !important`,
            '& + .MuiSwitch-track': {
              backgroundColor: `${alpha(theme.palette.text.primary, 0.12)} !important`,
            },
          },
        },
        '& .MuiSwitch-track': {
          backgroundColor: `${alpha(theme.palette.text.primary, 0.3)} !important`,
        },
      }),
    },
  },
}
