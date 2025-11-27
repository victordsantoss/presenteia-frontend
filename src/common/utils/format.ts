export class Format {
  static cpf(value: string) {
    const number = value.replace(/\D/g, '')
    return number.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  static currency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }
}

export const formatCurrency = (value: number) => Format.currency(value)
