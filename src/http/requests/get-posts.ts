import type { Post } from '@/types/post'
import { api } from '../api'

export type GetPostsResponse = Array<Post>

export async function getPosts() {
  const result = await api.get('posts?_embed=comments&_embed=likes').json<GetPostsResponse>()
  return result
}
