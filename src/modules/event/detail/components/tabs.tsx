'use client'

import { Box, Tabs, Tab } from '@mui/material'
import { Gift } from '@/services/domain/gift.types'

interface ICategoryTabsProps {
  selectedTab: number
  categories: Gift.IGetEventGiftCategoryResponse[]
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void
}

export function CategoryTabs({ selectedTab, categories, onTabChange }: ICategoryTabsProps) {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        mb: 4,
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            minWidth: { xs: 'auto', sm: 120 },
            color: 'secondary.main',
            '&.Mui-selected': {
              color: 'secondary.dark',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'secondary.dark',
          },
        }}
      >
        <Tab label="Todos" />
        {categories.map((category) => (
          <Tab key={category.id} label={category.name} />
        ))}
      </Tabs>
    </Box>
  )
}
