'use client'

import { ReactElement, cloneElement } from 'react'
import { Tooltip, TooltipProps } from '@mui/material'

interface DisabledTooltipProps {
  children: ReactElement
  title: string
  placement?: TooltipProps['placement']
}

export function DisabledTooltip({ 
  children, 
  title, 
  placement = 'top' 
}: DisabledTooltipProps) {
  // Clona o elemento filho e adiciona props de desabilitado
  const disabledChild = cloneElement(children, {
    disabled: true,
    sx: {
      ...children.props.sx,
      cursor: 'not-allowed',
      pointerEvents: 'auto', // Necessário para o tooltip funcionar
    },
  })

  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'warning.dark',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 500,
            '& .MuiTooltip-arrow': {
              color: 'warning.dark',
            },
          },
        },
      }}
    >
      {/* Span wrapper necessário para tooltip funcionar com elemento desabilitado */}
      <span style={{ display: 'inline-block' }}>
        {disabledChild}
      </span>
    </Tooltip>
  )
}

