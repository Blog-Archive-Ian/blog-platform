import {
  AuthCheck,
  Login,
  type AuthCheckResponse,
  type LoginBody,
  type LoginResponse,
} from '@blog/contracts'
import { API } from './client'

// 사용자 로그인
export async function login(params: LoginBody): Promise<LoginResponse> {
  const res = await API.post<LoginResponse>(Login.path, params)
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 사용자 인증
export async function authCheck(): Promise<AuthCheckResponse> {
  const res = await API.get<AuthCheckResponse>(AuthCheck.path)
  return res
}
