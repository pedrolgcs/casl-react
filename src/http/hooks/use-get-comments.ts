import { useQuery } from '@tanstack/react-query'

import { getComments, GetCommentsParams } from '../requests/get-comments'

export const USE_GET_COMMENTS_QUERY_KEY = 'comments'

export type UseGetPostsQueryKey = [typeof USE_GET_COMMENTS_QUERY_KEY, postId: number]

export function useGetComments(params: GetCommentsParams) {
  const key: UseGetPostsQueryKey = [USE_GET_COMMENTS_QUERY_KEY, params.postId]

  return useQuery({
    queryKey: key,
    queryFn: () => getComments(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
