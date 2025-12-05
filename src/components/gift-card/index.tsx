import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Stack,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material'
import {
  CardGiftcard as GiftIcon,
  CheckCircle as CheckIcon,
  TrendingUp as PriorityIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material'
import { formatCurrency } from '@/common/utils/format'
import { Gift } from '@/services/domain/gift.types'
import { PRIORITY_COLORS, PRIORITY_LABELS } from './priority.types'

interface GiftCardProps {
  gift: Gift.IGiftItem
  onReserve: (gift: Gift.IGiftItem) => void
}

function getPriorityColor(priority: string): string {
  return PRIORITY_COLORS[priority.toLowerCase()] || PRIORITY_COLORS.default
}

function getPriorityLabel(priority: string): string {
  return PRIORITY_LABELS[priority.toLowerCase()] || priority
}

export function GiftCard({ gift, onReserve }: GiftCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4,
          borderColor: 'primary.main',
        },
      }}
    >
      {/* Imagem */}
      <Box
        sx={{
          width: '100%',
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'grey.100',
        }}
      >
        <CardMedia
          component="img"
          image={gift.imageUrl || '/images/Image-not-found.png'}
          alt={gift.name}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement
            target.src = '/images/Image-not-found.png'
          }}
          sx={{
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Categoria e Prioridade */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={gift.category}
            size="small"
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.dark',
              fontWeight: 600,
            }}
          />
          <Chip
            icon={<PriorityIcon sx={{ fontSize: 16 }} />}
            label={getPriorityLabel(gift.priority)}
            size="small"
            sx={{
              bgcolor: `${getPriorityColor(gift.priority)}15`,
              color: getPriorityColor(gift.priority),
              fontWeight: 600,
            }}
          />
        </Stack>

        {/* Nome */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '1.125rem',
            color: 'primary.dark',
            mb: 1,
          }}
        >
          {gift.name}
        </Typography>

        {/* Descrição */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            mb: 2,
            flexGrow: 1,
          }}
        >
          {gift.description}
        </Typography>

        {/* Preço e Quantidade */}
        <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" fontWeight={600}>
              Preço médio: {formatCurrency(gift.price)}
            </Typography>
            <Tooltip
              title="Valor estimado com base em pesquisas realizadas. Este é apenas um valor de referência para compreensão do presente."
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: 'info.main',
                    color: 'white',
                    fontSize: '0.875rem',
                    '& .MuiTooltip-arrow': {
                      color: 'info.main',
                    },
                  },
                },
              }}
            >
              <IconButton
                size="small"
                sx={{
                  p: 0,
                  ml: 0.5,
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                <InfoIcon sx={{ fontSize: 16, color: 'info.main' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>

        {/* Botão */}
        <Button
          variant={gift.isAvailable ? 'contained' : 'outlined'}
          fullWidth
          disabled={!gift.isAvailable}
          startIcon={gift.isAvailable ? <GiftIcon /> : <CheckIcon />}
          onClick={() => gift.isAvailable && onReserve(gift)}
          color="success"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          {gift.isAvailable ? 'Reservar Presente' : 'Já Reservado'}
        </Button>
      </CardContent>
    </Card>
  )
}
