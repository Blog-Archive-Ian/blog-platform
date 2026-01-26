import { type LoginBody, type LoginResponse } from '@blog/contracts'
import { queryOptions, useMutation, useQuery, type UseMutationOptions } from '@tanstack/react-query'
import { authCheck, login } from '../api/user.api'

export const authQueryKeys = {
  all: ['auth'] as const,
  authCheck: () => [...authQueryKeys.all, 'auth-check'] as const,
}

// 사용자 인증
export const authCheckQueryOptions = queryOptions({
  queryKey: authQueryKeys.authCheck(),
  queryFn: async () => {
    const res = await authCheck()
    return res
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
})

export const useAuthCheck = () => useQuery(authCheckQueryOptions)

// 사용자 로그인
export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginBody>) => {
  return useMutation({
    mutationFn: async (body: LoginBody) => {
      const res = await login(body)
      return res
    },
    ...options,
  })
}
