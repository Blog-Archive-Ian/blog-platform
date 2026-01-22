import { z } from 'zod'
import { ApiResponse } from '../common'
import { UserSchema } from '../user'

// 사용자 계정 정보 조회
export const GetUserAccount = {
  method: 'GET',
  path: '/user/account',
  Response: ApiResponse(UserSchema),
}
export type GetUserAccountResponse = z.infer<typeof GetUserAccount.Response> // 응답 타입
export type GetUserAccountData = GetUserAccountResponse['data'] // 실제 데이터 타입
