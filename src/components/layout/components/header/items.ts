export interface MenuItem {
  label: string
  href: string
  icon?: string
}

export const menuItems: MenuItem[] = [
  {
    label: 'Início',
    href: '/',
  },
  {
    label: 'Sobre',
    href: '/sobre',
  },
  {
    label: 'Contato',
    href: '/contato',
  },
]
