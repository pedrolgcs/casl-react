import { PlusCircle } from "lucide-react"
import Link from "next/link"
import PostList from "@/components/post-list"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/posts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo
          </Button>
        </Link>
      </div>
      
      <PostList />
    </div>
  )
}
