export type PostComment = {
  id: string,
  postId: string,
  content: string
  user: {
    id: string
    email: string
  }
}

type Like = {
  id: string,
  postId: string,
  userId: string
}

export type Post = {
  id: string,
  title: string,
  subtitle: string,
  content: string,
  userId: string
  comments: Array<PostComment>
  likes: Array<Like>
}