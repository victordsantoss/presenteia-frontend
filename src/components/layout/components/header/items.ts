export interface MenuItem {
  label: string
  href: string
  anchor?: string // âncora sem o #
  icon?: string
}

export const menuItems: MenuItem[] = [
  {
    label: 'Início',
    href: '/',
  },
  {
    label: 'Como Funciona',
    href: '/#como-funciona',
    anchor: 'como-funciona',
  },
  {
    label: 'Eventos',
    href: '/#eventos',
    anchor: 'eventos',
  },
  {
    label: 'Depoimentos',
    href: '/#depoimentos',
    anchor: 'depoimentos',
  },
]
