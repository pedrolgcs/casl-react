import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CreatePost } from "@/modules/post/create-post"

export default function NewPost() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="flex items-center text-muted-foreground mb-6 hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para listagem
      </Link>

      <CreatePost />
    </div>
  )
}
