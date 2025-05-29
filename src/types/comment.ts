export type Comment = {
  id: string
  content: string
  postId: string
  user: {
    id: string
    email: string
  }
}