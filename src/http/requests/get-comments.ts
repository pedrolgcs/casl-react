import type { Comment } from '@/types/comment'
import { api } from '../api'

export type GetCommentsParams = {
  postId: number
}

export type GetCommentsResponse = Array<Comment>

export async function getComments(params: GetCommentsParams) {
  const { postId } = params

  const result = await api.get('comments', {
    searchParams: {
      postId: String(postId),
      _embed: 'user',
    }
  }).json<GetCommentsResponse>()

  return result
}
