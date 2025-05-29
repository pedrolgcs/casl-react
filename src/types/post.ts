export type PostComment = {
  id: number,
  postId: number,
  content: string
  user: {
    id: number
    email: string
  }
}

type Like = {
  id: number,
  postId: number,
  userId: number
}

export type Post = {
  id: number,
  title: string,
  subtitle: string,
  content: string,
  userId: number
  comments: Array<PostComment>
  likes: Array<Like>
}