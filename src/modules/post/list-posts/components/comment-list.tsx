import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface Comment {
  id: string
  author: string
  content: string
}

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="w-full space-y-4">
      <h3 className="font-medium">Comentários</h3>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum comentário ainda.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={comment.author} />
                <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="bg-slate-100 p-3 rounded-lg text-sm flex-1">
                <div className="font-medium mb-1">{comment.author}</div>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center space-x-2 mt-4">
        <Avatar className="h-6 w-6">
          <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Seu avatar" />
          <AvatarFallback>EU</AvatarFallback>
        </Avatar>

        <Input type="text" placeholder="Adicione um comentário..." />
      </div>
    </div>
  )
}
