import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material'
import { ComponentType } from 'react'

export interface FooterLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: ComponentType
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

// Links Rápidos
export const quickLinks: FooterLink[] = [
  { label: 'Início', href: '/' },
  { label: 'Sobre Nós', href: '/sobre' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Contato', href: '/contato' },
]

// Suporte
export const supportLinks: FooterLink[] = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Política de Privacidade', href: '/politica-privacidade' },
  { label: 'Termos de Uso', href: '/termos-uso' },
  { label: 'Central de Ajuda', href: '/ajuda' },
]

// Redes Sociais
export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
]

// Links do rodapé (copyright)
export const footerBottomLinks: FooterLink[] = [
  { label: 'Privacidade', href: '/politica-privacidade' },
  { label: 'Termos', href: '/termos-uso' },
  { label: 'Cookies', href: '/cookies' },
]

// Seções completas
export const footerSections: FooterSection[] = [
  {
    title: 'Links Rápidos',
    links: quickLinks,
  },
  {
    title: 'Suporte',
    links: supportLinks,
  },
]

// Informações da empresa
export const companyInfo = {
  name: 'Presenteia',
  description:
    'Transforme momentos especiais em presentes inesquecíveis. Encontre o presente perfeito para cada ocasião.',
  socialTitle: 'Redes Sociais',
  socialDescription: 'Siga-nos nas redes sociais',
}
