import {
  AuthCheck,
  EditUser,
  EditUserProfileImage,
  GetUserAccount,
  getUserCategories,
  getUserTags,
  Login,
  type AuthCheckResponse,
  type EditUserBody,
  type EditUserProfileImageBody,
  type EditUserProfileImageResponse,
  type EditUserResponse,
  type GetUserAccountData,
  type GetUserAccountResponse,
  type GetUserCategoriesData,
  type GetUserCategoriesResponse,
  type GetUserTagsData,
  type GetUserTagsResponse,
  type LoginBody,
  type LoginResponse,
} from '@blog/contracts'
import { API } from './client'

// 사용자 로그인
export async function login(params: LoginBody): Promise<LoginResponse> {
  const res = await API.post<LoginResponse>(Login.path, params, {}, { dev: true })
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 사용자 인증
export async function authCheck(): Promise<AuthCheckResponse> {
  const res = await API.get<AuthCheckResponse>(AuthCheck.path, {}, { dev: true })
  return res
}

// 사용자 정보
export async function getUserInfo(): Promise<GetUserAccountData> {
  const res = await API.get<GetUserAccountResponse>(GetUserAccount.path)
  if (res.status !== 200) throw new Error(res.message)
  return res.data
}

// 사용자 정보 수정
export async function editUserInfo(params: Partial<EditUserBody>): Promise<EditUserResponse> {
  const res = await API.patch<EditUserResponse>(EditUser.path, params)
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 사용자 프로필 이미지 수정
export async function editUserProfileImage(
  params: EditUserProfileImageBody,
): Promise<EditUserProfileImageResponse> {
  const res = await API.patch<EditUserProfileImageResponse>(EditUserProfileImage.path, params)
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 카테고리 조회
export async function getCategories(): Promise<GetUserCategoriesData> {
  const res = await API.get<GetUserCategoriesResponse>(getUserCategories.path)
  if (res.status !== 200) throw new Error(res.message)
  return res.data
}

// 태그 조회
export async function getTags(): Promise<GetUserTagsData> {
  const res = await API.get<GetUserTagsResponse>(getUserTags.path)
  if (res.status !== 200) throw new Error(res.message)
  return res.data
}
