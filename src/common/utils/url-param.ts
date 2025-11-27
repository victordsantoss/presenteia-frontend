import { ReadonlyURLSearchParams } from 'next/navigation'

/**
 * Adiciona, substitui ou remove um parâmetro da URL e dispara `router.replace`.
 *
 * @param pathname      rota atual (usePathname)
 * @param searchParams  objeto retornado por useSearchParams
 * @param replace       função retornada por useRouter
 * @param key           nome do parâmetro
 * @param value         valor do parâmetro (se null/undefined ⇒ remove)
 */
export const updateQueryParam = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  replace: (url: string) => void,
  key: string,
  value: string | null | undefined
): void => {
  const params = new URLSearchParams(searchParams.toString())

  if (value == null || value === '') {
    params.delete(key)
  } else {
    params.set(key, value)
  }

  replace(`${pathname}?${params.toString()}`)
}
