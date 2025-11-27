import { IFetchSuccessResponse, IFetchErrorResponse } from '@/common/types/fetch.types'
import { getDefaultHeaders } from './headers'

export type QueryParams = Record<string, unknown>

export const apiFetch = async <T, Q extends QueryParams = QueryParams>(
  endpoint: string,
  options: RequestInit = {},
  queryParams?: Q
): Promise<T> => {
  const { body, ...rest } = options
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://central-da-fe-backend.vercel.app/'
  const url = new URL(`${baseUrl}${endpoint}`)

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  /* ----------- inclusão do token ----------- */
  const defaultHeaders = await getDefaultHeaders()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...defaultHeaders,
    ...options.headers,
  }

  const response = await fetch(url.toString(), {
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const data = await response.json()

  return {
    ok: response.ok,
    status: response.status,
    response: data,
  } as T
}

export const handleApiError = <T>(
  response: IFetchSuccessResponse<T> | IFetchErrorResponse,
  defaultMessage = 'Erro inesperado. Tente novamente.'
): T => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.response.message || defaultMessage}`)
  }
  return response.response as T
}
