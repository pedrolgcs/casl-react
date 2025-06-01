'use client'

import { setCookie } from 'cookies-next/client'
import { CheckSquare } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetUsers } from '@/http/hooks/use-get-users'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store'

export default function Header() {
  const profile = useAppStore((state) => state.profile)

  const setProfile = useAppStore((state) => state.setProfile)

  const { data: users } = useGetUsers()

  const handleSelectProfile = (id: string) => {
    const user = users?.find((u) => u.id === id)

    if (user) {
      setCookie('taskboard', user.id)
      setProfile(user)
    }
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-5">
        <div
          className={cn(
            'flex flex-col gap-4',
            'sm:flex-row sm:justify-between',
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <CheckSquare className="size-7 text-sky-600" />
            <h1 className="text-2xl font-bold text-gray-900">TaskBoard</h1>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden font-medium text-gray-600 sm:block">
              Autenticar como:
            </span>

            <Select value={profile.id} onValueChange={handleSelectProfile}>
              <SelectTrigger className={cn('w-full', 'sm:w-[250px]')}>
                <SelectValue placeholder="Selecionar usuário">
                  {profile && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="text-xs">
                          {profile.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <span className="truncate">{profile.name}</span>
                        <div className="h-4 w-px bg-gray-300" />
                        <span className="text-muted-foreground text-xs font-bold">
                          {profile.role}
                        </span>
                      </div>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-3 py-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || '/placeholder.svg'} />
                        <AvatarFallback className="text-xs">
                          {user.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {user.name} - {user.role}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  )
}
