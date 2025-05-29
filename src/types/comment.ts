export type Comment = {
  id: number
  content: string
  postId: number
  user: {
    id: number
    email: string
  }
}