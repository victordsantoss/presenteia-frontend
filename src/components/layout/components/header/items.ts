export interface MenuItem {
  label: string
  href: string
  icon?: string
}

export const menuItems: MenuItem[] = [
  {
    label: 'Início',
    href: '#inicio',
  },
  {
    label: 'Como Funciona',
    href: '#como-funciona',
  },
  {
    label: 'Eventos',
    href: '#eventos',
  },
  {
    label: 'Depoimentos',
    href: '#depoimentos',
  },
]
