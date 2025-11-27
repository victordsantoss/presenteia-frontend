export interface IFetchResponseBase {
  status: number
  ok: boolean
}

export interface IFetchSuccessResponse<T> extends IFetchResponseBase {
  ok: true
  response: T
}

export interface IFetchErrorResponse extends IFetchResponseBase {
  ok: false
  response: { message: string }
}
