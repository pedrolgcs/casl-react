import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EditPost } from "@/modules/post/edit-post"

type EditPostPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id: postId } = await params

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="flex items-center text-muted-foreground mb-6 hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para listagem
      </Link>

      <EditPost postId={postId} />
    </div>
  )
}
