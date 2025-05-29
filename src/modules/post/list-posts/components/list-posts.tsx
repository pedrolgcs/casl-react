"use client"

import { useState } from "react"
import PostCard from "./post-card"

const MOCK_POSTS = [
  {
    id: "1",
    title: "Introdução ao Next.js",
    subtitle: "Aprenda os fundamentos do framework React mais popular",
    content:
      "Next.js é um framework React que permite funcionalidades como renderização do lado do servidor e geração de sites estáticos para aplicativos da web baseados em React...",
    author: {
      id: "user1",
      name: "João Silva",
    },
    likes: 15,
    comments: [
      { id: "c1", author: "Maria", content: "Ótimo artigo! Muito útil." },
      { id: "c2", author: "Pedro", content: "Estou começando com Next.js e isso me ajudou muito." },
    ],
  },
  {
    id: "2",
    title: "Tailwind CSS na prática",
    subtitle: "Como utilizar o Tailwind CSS em seus projetos",
    content:
      "Tailwind CSS é um framework CSS utilitário que permite construir designs personalizados sem sair do seu HTML. Neste post, vamos explorar como configurar e usar efetivamente...",
    author: {
      id: "user2",
      name: "Ana Costa",
    },
    likes: 8,
    comments: [{ id: "c3", author: "Carlos", content: "Tailwind mudou minha forma de estilizar aplicações!" }],
  },
  {
    id: "3",
    title: "Autenticação em aplicações modernas",
    subtitle: "Implementando autenticação segura em suas aplicações web",
    content:
      "A segurança é um aspecto crucial no desenvolvimento de aplicações web. Neste artigo, discutiremos as melhores práticas para implementar autenticação...",
    author: {
      id: "user1",
      name: "João Silva",
    },
    likes: 23,
    comments: [
      { id: "c4", author: "Fernanda", content: "Muito importante esse tema!" },
      { id: "c5", author: "Ricardo", content: "Vocês poderiam falar sobre JWT também?" },
      { id: "c6", author: "Mariana", content: "Implementei as dicas e funcionou perfeitamente." },
    ],
  },
]

export function ListPosts() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  
  const currentUserId = "user1"

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isOwner={post.author.id === currentUserId} onLike={handleLike} />
      ))}
    </div>
  )
}
