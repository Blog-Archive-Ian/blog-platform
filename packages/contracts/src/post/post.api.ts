import { z } from 'zod'
import { ApiResponse, ApiResponseStrict, PaginatedResponse } from '../common'
import {
  CreatePostSchema,
  FilteredPostListQuerySchema,
  PostListQuerySchema,
  PostSchema,
} from './post.schema'
// 글 목록 조회
export const GetPostList = {
  method: 'GET',
  path: '/post',
  Query: PostListQuerySchema,
  Response: ApiResponseStrict(PaginatedResponse(PostSchema)),
}
export type GetPostListResponse = z.infer<typeof GetPostList.Response> // 응답 타입
export type GetPostListQuery = z.infer<typeof GetPostList.Query> // 요청 쿼리 타입
export type GetPostListData = GetPostListResponse['data'] // 실제 데이터 타입

// 고정 글 목록 조회
export const GetPinnedPostList = {
  method: 'GET',
  path: '/post/pinned',
  Query: PostListQuerySchema,
  Response: ApiResponseStrict(PaginatedResponse(PostSchema)),
}
export type GetPinnedPostListResponse = z.infer<typeof GetPinnedPostList.Response> // 응답 타입
export type GetPinnedPostListQuery = z.infer<typeof GetPinnedPostList.Query> // 요청 쿼리 타입
export type GetPinnedPostListData = GetPinnedPostListResponse['data'] // 실제 데이터 타입

// 보관 글 목록 조회
export const GetArchivedPostList = {
  method: 'GET',
  path: '/post/archived',
  Query: PostListQuerySchema,
  Response: ApiResponseStrict(PaginatedResponse(PostSchema)),
}
export type GetArchivedPostListResponse = z.infer<typeof GetArchivedPostList.Response> // 응답 타입
export type GetArchivedPostListQuery = z.infer<typeof GetArchivedPostList.Query> // 요청 쿼리 타입
export type GetArchivedPostListData = GetArchivedPostListResponse['data'] // 실제 데이터 타입

// 인기 글 목록 조회
export const GetPopularPostList = {
  method: 'GET',
  path: '/post/popular',
  Response: ApiResponseStrict(z.array(PostSchema)),
}
export type GetPopularPostListResponse = z.infer<typeof GetPopularPostList.Response> // 응답 타입
export type GetPopularPostListData = GetPopularPostListResponse['data'] // 실제 데이터 타입

// 글 상세 조회
export const GetPostDetail = {
  method: 'GET',
  path: (postSeq: number | string) => `/post/${postSeq}`,
  Params: z.object({
    postSeq: z.union([z.number(), z.string()]),
  }),
  Response: ApiResponseStrict(PostSchema),
}
export type GetPostDetailResponse = z.infer<typeof GetPostDetail.Response> // 응답 타입
export type GetPostDetailParams = z.infer<typeof GetPostDetail.Params> // 요청 파라미터 타입
export type GetPostDetailData = GetPostDetailResponse['data'] // 실제 데이터 타입

// 월별 게시글 목록 조회
export const GetMonthPostList = {
  method: 'GET',
  path: '/post/calendar',
  Query: z.object({
    year: z.number(),
    month: z.number().min(1).max(12),
  }),
  Response: ApiResponseStrict(z.array(z.number())),
}
export type GetMonthPostListResponse = z.infer<typeof GetMonthPostList.Response> // 응답 타입
export type GetMonthPostListQuery = z.infer<typeof GetMonthPostList.Query> // 요청 쿼리 타입
export type GetMonthPostListData = GetMonthPostListResponse['data'] // 실제 데이터 타입

// 글 작성
export const CreatePost = {
  method: 'POST',
  path: '/post',
  Body: CreatePostSchema,
  Response: ApiResponseStrict(
    z.object({
      postSeq: z.number(),
    }),
  ),
}
export type CreatePostResponse = z.infer<typeof CreatePost.Response> // 응답 타입
export type CreatePostBody = z.infer<typeof CreatePost.Body> // 요청 바디 타입
export type CreatePostData = CreatePostResponse['data'] // 실제 데이터 타입

// 글 삭제
export const DeletePost = {
  method: 'DELETE',
  path: (postSeq: number) => `/post/${postSeq}`,
  Params: z.object({
    postSeq: z.number(),
  }),
  Response: ApiResponse(z.never()),
}
export type DeletePostResponse = z.infer<typeof DeletePost.Response> // 응답 타입
export type DeletePostParams = z.infer<typeof DeletePost.Params> // 요청 파라미터 타입

// 글 수정
export const UpdatePost = {
  method: 'PUT',
  path: (postSeq: number | string) => `/post/${postSeq}`,
  Params: z.object({
    postSeq: z.union([z.number(), z.string()]),
  }),
  Body: CreatePostSchema,
  Response: ApiResponse(z.never()),
}
export type UpdatePostResponse = z.infer<typeof UpdatePost.Response>
export type UpdatePostParams = z.infer<typeof UpdatePost.Params>
export type UpdatePostBody = z.infer<typeof UpdatePost.Body>
export type UpdatePostData = UpdatePostResponse['data']

// 글 필터링 조회
export const GetFilteredPostList = {
  method: 'GET',
  path: '/post',
  Query: FilteredPostListQuerySchema,
  Response: ApiResponseStrict(PaginatedResponse(PostSchema)),
}
export type GetFilteredPostListResponse = z.infer<typeof GetFilteredPostList.Response> // 응답 타입
export type GetFilteredPostListQuery = z.infer<typeof GetFilteredPostList.Query> // 요청 쿼리 타입
export type GetFilteredPostListData = GetFilteredPostListResponse['data'] // 실제 데이터 타입
