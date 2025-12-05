import { Box, type SxProps, type Theme, type Breakpoint } from '@mui/material'

interface DecorativeCircleProps {
  size: number | string
  top?: string | number
  bottom?: string | number
  left?: string | number
  right?: string | number
  color?: 'primary.main' | 'primary.light' | string
  opacity?: number
  hideBelow?: Breakpoint
}

export function DecorativeCircle({
  size,
  top,
  bottom,
  left,
  right,
  color = 'primary.light',
  opacity = 0.3,
  hideBelow = 'md',
}: DecorativeCircleProps) {
  const sxProps: SxProps<Theme> = {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    bgcolor: color,
    opacity,
    zIndex: 0,
    display: { xs: 'none', [hideBelow]: 'block' },
  }

  if (top !== undefined) sxProps.top = top
  if (bottom !== undefined) sxProps.bottom = bottom
  if (left !== undefined) sxProps.left = left
  if (right !== undefined) sxProps.right = right

  return <Box sx={sxProps} />
}
