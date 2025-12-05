export const GiftPriority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const

export type GiftPriorityType = (typeof GiftPriority)[keyof typeof GiftPriority]

export const PRIORITY_COLORS: Record<string, string> = {
  [GiftPriority.HIGH]: '#FF4757',
  [GiftPriority.MEDIUM]: '#FFC312',
  [GiftPriority.LOW]: '#70A1FF',
  default: '#95a5a6',
} as const

export const PRIORITY_LABELS: Record<string, string> = {
  [GiftPriority.HIGH]: 'Alta',
  [GiftPriority.MEDIUM]: 'Média',
  [GiftPriority.LOW]: 'Baixa',
} as const
