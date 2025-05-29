"use client"

import { useGetPosts } from "@/http/hooks/use-get-posts"
import PostCard from "./post-card"

export function ListPosts() {
  const { data: posts } = useGetPosts()

  const currentUserId = 1

  const handleLike = (postId: number) => {
    console.log(`Like post ${postId}`)
  }

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} isOwner={post.userId === currentUserId} onLike={handleLike} />
      ))}
    </div>
  )
}
