"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar o post
    console.log({ title, subtitle, content })

    // Redirecionar para a página principal após criar o post
    router.push("/")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="flex items-center text-muted-foreground mb-6 hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para listagem
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Criar Novo Post</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título do post"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subtitle" className="text-sm font-medium">
                Subtítulo
              </label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Digite o subtítulo do post"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Conteúdo
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite o conteúdo do post"
                rows={10}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Publicar Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
