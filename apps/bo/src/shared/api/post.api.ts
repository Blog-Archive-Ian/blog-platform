import { API } from '@/shared/api/client'
import {
  ArchivePost,
  CreatePost,
  DeletePost,
  GetFilteredPostList,
  GetPinnedPostList,
  GetPopularPostList,
  GetPostDetail,
  PinPost,
  UnArchivePost,
  UnPinPost,
  UpdatePost,
  type ArchivePostParams,
  type ArchivePostResponse,
  type CreatePostBody,
  type CreatePostData,
  type CreatePostResponse,
  type DeletePostParams,
  type DeletePostResponse,
  type GetFilteredPostListData,
  type GetFilteredPostListQuery,
  type GetFilteredPostListResponse,
  type GetPinnedPostListData,
  type GetPinnedPostListQuery,
  type GetPinnedPostListResponse,
  type GetPopularPostListData,
  type GetPopularPostListResponse,
  type GetPostDetailData,
  type GetPostDetailParams,
  type GetPostDetailResponse,
  type PinPostParams,
  type PinPostResponse,
  type UnArchivePostParams,
  type UnArchivePostResponse,
  type UnPinPostParams,
  type UnPinPostResponse,
  type UpdatePostBody,
  type UpdatePostParams,
  type UpdatePostResponse,
} from '@blog/contracts'

// 글 목록 조회
export async function getFilteredPostList(
  query: GetFilteredPostListQuery,
): Promise<GetFilteredPostListData> {
  const res = await API.get<GetFilteredPostListResponse>(
    GetFilteredPostList.path,
    {
      params: query,
    },
    { dev: true },
  )
  if (res.status !== 200) throw new Error(res.message)
  return res.data
}

// 고정 글 목록 조회
export async function getPinnedPostList(
  query: GetPinnedPostListQuery,
): Promise<GetPinnedPostListData> {
  const res = await API.get<GetPinnedPostListResponse>(GetPinnedPostList.path, {
    params: query,
  })
  if (res.status !== 200) throw new Error(res.message)
  return res.data
}

// 인기 글 목록 조회
export async function getPopularPostList(): Promise<GetPopularPostListData> {
  const res = await API.get<GetPopularPostListResponse>(GetPopularPostList.path)
  if (res.status !== 200) throw new Error(res.message)
  return res.data
}

// 글 상세 조회
export async function getPostDetail(
  params: GetPostDetailParams,
): Promise<GetPostDetailData | null> {
  const res = await API.get<GetPostDetailResponse>(
    GetPostDetail.path(params.postSeq),
    {},
    { dev: true },
  )
  if (res.status === 404) return null
  if (res.status !== 200) {
    throw new Error(res.message)
  }
  return res.data
}

// 글 작성
export async function createPost(params: CreatePostBody): Promise<CreatePostData> {
  const res = await API.post<CreatePostResponse>(CreatePost.path, params)
  if (res.status !== 200) throw new Error(res.message)
  return res.data
}

// 글 삭제
export async function deletePost(params: DeletePostParams): Promise<DeletePostResponse> {
  const res = await API.delete<DeletePostResponse>(
    DeletePost.path(params.postSeq),
    {},
    { dev: true },
  )
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 글 수정
export async function updatePost(
  params: UpdatePostParams,
  body: UpdatePostBody,
): Promise<UpdatePostResponse> {
  const res = await API.put<UpdatePostResponse>(UpdatePost.path(params.postSeq), body)
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 글 고정
export async function pinPost(params: PinPostParams): Promise<PinPostResponse> {
  const res = await API.post<PinPostResponse>(PinPost.path(params.postSeq), {}, {}, { dev: true })
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 글 고정해제
export async function unpinPost(params: UnPinPostParams): Promise<UnPinPostResponse> {
  const res = await API.post<UnPinPostResponse>(
    UnPinPost.path(params.postSeq),
    {},
    {},
    { dev: true },
  )
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 글 보관
export async function archivePost(params: ArchivePostParams): Promise<ArchivePostResponse> {
  const res = await API.post<ArchivePostResponse>(
    ArchivePost.path(params.postSeq),
    {},
    {},
    { dev: true },
  )
  if (res.status !== 200) throw new Error(res.message)
  return res
}

// 글 보관 해제
export async function unarchivePost(params: UnArchivePostParams): Promise<UnArchivePostResponse> {
  const res = await API.post<UnArchivePostResponse>(
    UnArchivePost.path(params.postSeq),
    {},
    {},
    {
      dev: true,
    },
  )
  if (res.status !== 200) throw new Error(res.message)
  return res
}
