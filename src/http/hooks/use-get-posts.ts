import { useQuery } from '@tanstack/react-query'

import { getPosts } from '../requests/get-posts'

export const USE_GET_POSTS_QUERY_KEY = 'posts'

export type UseGetPostsQueryKey = [typeof USE_GET_POSTS_QUERY_KEY]

export function useGetPosts() {
  const key: UseGetPostsQueryKey = [USE_GET_POSTS_QUERY_KEY]

  return useQuery({
    queryKey: key,
    queryFn: () => getPosts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
