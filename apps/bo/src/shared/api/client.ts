import axios, { type AxiosRequestConfig, type RawAxiosRequestHeaders } from 'axios'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type Primitive = string | number | boolean | null | undefined

export type RequestOptions<TBody> = {
  params?: Record<string, Primitive>
  body?: TBody
  headers?: RawAxiosRequestHeaders
}

const baseURL = import.meta.env.VITE_PUBLIC_API as string | undefined
const baseURL2 = import.meta.env.VITE_PUBLIC_API2 as string | undefined
const blogId = import.meta.env.VITE_PUBLIC_BLOG_ID as string | undefined

if (!baseURL) throw new Error('VITE_PUBLIC_API is missing')
if (!blogId) throw new Error('VITE_PUBLIC_BLOG_ID is missing')

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    blogId,
  },
})

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.data) {
      return Promise.reject(new Error(error.response.data.message))
    }

    return Promise.reject(error)
  },
)

type InternalOptions = {
  dev?: boolean
}

export class API {
  private static async request<TResponse, TBody = unknown>(
    method: HttpMethod,
    url: string,
    options: RequestOptions<TBody> = {},
    internal?: InternalOptions,
  ): Promise<TResponse> {
    const config: AxiosRequestConfig = {
      method,
      url,
      baseURL: internal?.dev ? baseURL2 : undefined,
      params: options.params,
      headers: {
        ...(options.headers ?? {}),
      },
      data: options.body,
    }

    const res = await instance.request<TResponse>(config)
    return res.data
  }

  static get<TResponse>(url: string, options?: RequestOptions<never>, internal?: InternalOptions) {
    return API.request<TResponse>('GET', url, options ?? {}, internal)
  }

  static post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions<TBody>,
    internal?: InternalOptions,
  ) {
    return API.request<TResponse, TBody>('POST', url, { ...options, body }, internal)
  }

  static put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions<TBody>,
    internal?: InternalOptions,
  ) {
    return API.request<TResponse, TBody>('PUT', url, { ...options, body }, internal)
  }

  static patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestOptions<TBody>,
    internal?: InternalOptions,
  ) {
    return API.request<TResponse, TBody>('PATCH', url, { ...options, body }, internal)
  }

  static delete<TResponse>(
    url: string,
    options?: RequestOptions<never>,
    internal?: InternalOptions,
  ) {
    return API.request<TResponse>('DELETE', url, options, internal)
  }
}
