'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'cookies-next/client'
import { z } from 'zod'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from '@/http/hooks/use-sign-in';
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
  email: z.string({ required_error: 'E-mail é obrigatório' }).email({ message: 'E-mail inválido' }),
})

type SignInData = z.infer<typeof signInSchema>

export function SignIn() {
  const router = useRouter()

  const { mutate: signIn } = useSignIn()

  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const handleSignIn = (data: SignInData) => {
    signIn({ email: data.email }, {
      onSuccess: () => {
        setCookie('authToken', data.email)
        router.push('/')
      }
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
      <div className='space-y-2'>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="text" placeholder="john.doe@example.com" {...register('email')} />
        {errors.email && <span className="text-rose-500 text-sm font-medium">{errors.email.message}</span>}
      </div>

      <Button type="submit">Entrar</Button>
    </form>
  )
}