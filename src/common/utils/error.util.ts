interface IApiError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

export const getErrorMessage = (
  error: unknown,
  fallback = 'Erro inesperado. Tente novamente.'
): string => {
  const apiError = error as IApiError

  return apiError?.response?.data?.message || apiError?.message || fallback
}
