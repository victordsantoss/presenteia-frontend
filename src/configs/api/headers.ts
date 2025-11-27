import { cookies } from 'next/headers'

/**
 * Retorna o header Authorization com o token salvo no cookie
 * quando o código está rodando no lado do servidor (App Router).
 * No cliente ou se o cookie não existir → objeto vazio.
 */
export const getDefaultHeaders = async (): Promise<HeadersInit> => {
  try {
    const token = (await cookies()).get('AUTH_TOKEN')?.value
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch {
    return {}
  }
}
