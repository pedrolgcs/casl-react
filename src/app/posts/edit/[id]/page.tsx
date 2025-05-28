"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Dados de exemplo para simular posts
const MOCK_POSTS = [
  {
    id: "1",
    title: "Introdução ao Next.js",
    subtitle: "Aprenda os fundamentos do framework React mais popular",
    content:
      "Next.js é um framework React que permite funcionalidades como renderização do lado do servidor e geração de sites estáticos para aplicativos da web baseados em React...",
  },
  {
    id: "2",
    title: "Tailwind CSS na prática",
    subtitle: "Como utilizar o Tailwind CSS em seus projetos",
    content:
      "Tailwind CSS é um framework CSS utilitário que permite construir designs personalizados sem sair do seu HTML. Neste post, vamos explorar como configurar e usar efetivamente...",
  },
  {
    id: "3",
    title: "Autenticação em aplicações modernas",
    subtitle: "Implementando autenticação segura em suas aplicações web",
    content:
      "A segurança é um aspecto crucial no desenvolvimento de aplicações web. Neste artigo, discutiremos as melhores práticas para implementar autenticação...",
  },
]

type EditPostProps = {
  params: Promise<{ id: string }>
}

export default function EditPost({ params }: EditPostProps) {
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")

  const router = useRouter()

  useEffect(() => {
    const execute = async () => {
      const { id } = await params
      const post = MOCK_POSTS.find((p) => p.id === id)
  
      if (post) {
        setTitle(post.title)
        setSubtitle(post.subtitle)
        setContent(post.content)
      } else {
        router.push("/")
      }
    }

    execute()
  }, [params, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
          <CardTitle>Editar Post</CardTitle>
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
              Salvar Alterações
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
