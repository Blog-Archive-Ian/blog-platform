import {
  type ArchivePostParams,
  type ArchivePostResponse,
  type CreatePostBody,
  type CreatePostData,
  type DeletePostParams,
  type DeletePostResponse,
  type GetArchivedPostListData,
  type GetArchivedPostListQuery,
  type GetFilteredPostListData,
  type GetFilteredPostListQuery,
  type GetPinnedPostListData,
  type GetPinnedPostListQuery,
  type GetPopularPostListData,
  type GetPostDetailData,
  type GetPostDetailParams,
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
import { toast } from '@blog/ui'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { useCallback } from 'react'
import {
  archivePost,
  createPost,
  deletePost,
  getArchivedPostList,
  getFilteredPostList,
  getPinnedPostList,
  getPopularPostList,
  getPostDetail,
  pinPost,
  unarchivePost,
  unpinPost,
  updatePost,
} from '../api/post.api'

export const postQueryKeys = {
  all: ['post'] as const,
  lists: (query: GetFilteredPostListQuery) => [...postQueryKeys.all, query, 'list'] as const,
  pinnedLists: (query: GetPinnedPostListQuery) =>
    [...postQueryKeys.all, query, 'pinned-list'] as const,
  archivedLists: (query: GetArchivedPostListQuery) =>
    [...postQueryKeys.all, query, 'archived-list'] as const,
  popularLists: () => [...postQueryKeys.all, 'popular-list'] as const,
  postDetail: (params: GetPostDetailParams) => [...postQueryKeys.all, params, 'detail'] as const,
}

// 글 목록 조회
export const usePostList = (
  query: GetFilteredPostListQuery,
  options?: UseQueryOptions<GetFilteredPostListData, Error>,
) => {
  return useQuery({
    queryKey: postQueryKeys.lists(query),
    queryFn: async () => {
      const res = await getFilteredPostList(query)
      return res
    },
    select: useCallback((data: GetFilteredPostListData) => data, []),
    ...options,
  })
}

// 고정 글 목록 조회
export const usePinnedPostList = (
  query: GetPinnedPostListQuery,
  options?: UseQueryOptions<GetPinnedPostListData, Error>,
) => {
  return useQuery({
    queryKey: postQueryKeys.pinnedLists(query),
    queryFn: async () => {
      const res = await getPinnedPostList(query)
      return res
    },
    select: useCallback((data: GetPinnedPostListData) => data, []),
    ...options,
  })
}

// 보관 글 목록 조회
export const useArchivedPostList = (
  query: GetArchivedPostListQuery,
  options?: UseQueryOptions<GetArchivedPostListData, Error>,
) => {
  return useQuery({
    queryKey: postQueryKeys.archivedLists(query),
    queryFn: async () => {
      const res = await getArchivedPostList(query)
      return res
    },
    select: useCallback((data: GetArchivedPostListData) => data, []),
    ...options,
  })
}

// 인기 글 목록 조회
export const usePopularPostList = (options?: UseQueryOptions<GetPopularPostListData, Error>) => {
  return useQuery({
    queryKey: postQueryKeys.popularLists(),
    queryFn: async () => {
      const res = await getPopularPostList()
      return res
    },
    select: useCallback((data: GetPopularPostListData) => data, []),
    ...options,
  })
}

// 글 상세 조회
export const usePostDetail = (
  params: GetPostDetailParams,
  options?: UseQueryOptions<GetPostDetailData | null, Error>,
) => {
  return useQuery({
    queryKey: postQueryKeys.postDetail(params),
    queryFn: async () => {
      const res = await getPostDetail(params)
      return res
    },
    select: useCallback((data: GetPostDetailData | null) => data, []),
    ...options,
  })
}

// 글 작성
export const useCreatePost = (
  options?: UseMutationOptions<CreatePostData, Error, CreatePostBody>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreatePostBody) => {
      const res = await createPost(body)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all })
      toast.success('글이 성공적으로 작성되었습니다.')
    },
    onError: (error) => {
      toast.error(`글 작성에 실패했습니다: ${error.message}`)
    },
    ...options,
  })
}

// 글 삭제
export const useDeletePost = (
  options?: UseMutationOptions<DeletePostResponse, Error, DeletePostParams>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: DeletePostParams) => {
      const res = await deletePost(params)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all })
      toast.success('글이 성공적으로 삭제되었습니다.')
    },
    onError: (error) => {
      toast.error(`글 삭제 중 오류가 발생했습니다: ${error.message}`)
    },
    ...options,
  })
}

type UpdatePostVariables = {
  params: UpdatePostParams
  body: UpdatePostBody
}

export const useUpdatePost = (
  options?: UseMutationOptions<UpdatePostResponse, Error, UpdatePostVariables>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ params, body }) => {
      return updatePost(params, body)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postQueryKeys.all })
      toast.success('글이 수정되었습니다.')
    },
    onError: (error) => {
      toast.error(`글 수정에 실패했습니다:  ${error.message}`)
    },
    ...options,
  })
}

// 글 고정
export const usePinPost = (options?: UseMutationOptions<PinPostResponse, Error, PinPostParams>) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: PinPostParams) => {
      const res = await pinPost(params)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all })
      toast.success('글이 고정되었습니다.')
    },
    onError: (error) => {
      toast.error(`글 고정에 실패하였습니다: ${error.message}`)
    },
    ...options,
  })
}

// 글 고정
export const useUnPinPost = (
  options?: UseMutationOptions<UnPinPostResponse, Error, UnPinPostParams>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: UnPinPostParams) => {
      const res = await unpinPost(params)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all })
      toast.success('글이 고정해제 되었습니다.')
    },
    onError: (error) => {
      toast.error(`글 고정해제에 실패하였습니다: ${error.message}`)
    },
    ...options,
  })
}

// 글 보관
export const useArchivePost = (
  options?: UseMutationOptions<ArchivePostResponse, Error, ArchivePostParams>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: ArchivePostParams) => {
      const res = await archivePost(params)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all })
      toast.success('글이 보관되었습니다.')
    },
    onError: (error) => {
      toast.error(`글 보관에 실패하였습니다: ${error.message}`)
    },
    ...options,
  })
}

// 글 보관 해제
export const useUnArchivePost = (
  options?: UseMutationOptions<UnArchivePostResponse, Error, UnArchivePostParams>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: UnArchivePostParams) => {
      const res = await unarchivePost(params)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all })
      toast.success('글이 보관 해제되었습니다.')
    },
    onError: (error) => {
      toast.error(`글 보관 해제에 실패하였습니다: ${error.message}`)
    },
    ...options,
  })
}
