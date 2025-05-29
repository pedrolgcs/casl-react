"use client"

import { useState } from "react"
import { HeartIcon, MessageCircleIcon, EditIcon, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"
import { CommentList } from "./comment-list"

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
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-muted-foreground">{post.subtitle}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 items-start">
              <span className="text-sm font-medium">{post.author.name}</span>
              <span className="text-xs font-medium text-gray-500">john@gmail.com</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-4">{post.content}</p>
      </CardContent>


      <Collapsible open={showComments} onOpenChange={setShowComments}>
        <CardFooter className="flex flex-col items-start space-y-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1" onClick={() => onLike(post.id)}>
                <HeartIcon className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>

              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircleIcon className="h-4 w-4" />
                  <span>{post.comments.length}</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/posts/${post.id}`}>
                  <EyeIcon className="h-4 w-4" />
                  Ler
                </Link>
              </Button>

              {isOwner && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/posts/edit/${post.id}`}>
                    <EditIcon className="h-4 w-4" />
                    Editar
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <CollapsibleContent className="w-full pb-1 pr-1">
            <CommentList comments={post.comments} />
          </CollapsibleContent>
        </CardFooter>
      </Collapsible>
    </Card>
  )
}
