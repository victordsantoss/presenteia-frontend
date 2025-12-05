import { Box, Typography } from '@mui/material'

interface EmptyStateProps {
  icon: React.ReactNode
  message: string
}

export function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
      }}
    >
      {icon}
      <Typography variant="h6" color="text.primary">
        {message}
      </Typography>
    </Box>
  )
}
