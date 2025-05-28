"use client"

import { useState } from "react"
import { Heart, MessageCircle, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import CommentList from "./comment-list"

interface Comment {
  id: string
  author: string
  content: string
}

interface Author {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  subtitle: string
  content: string
  author: Author
  likes: number
  comments: Comment[]
}

interface PostCardProps {
  post: Post
  isOwner: boolean
  onLike: (postId: string) => void
}

export default function PostCard({ post, isOwner, onLike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-muted-foreground">{post.subtitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1" onClick={() => onLike(post.id)}>
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          {isOwner && (
            <Link href={`/posts/edit/${post.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </Link>
          )}
        </div>

        {showComments && <CommentList comments={post.comments} />}
      </CardFooter>
    </Card>
  )
}
