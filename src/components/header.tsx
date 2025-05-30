'use client'

import { CheckSquare } from 'lucide-react'

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
      setProfile(user)
    }
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="size-7 text-sky-600" />
            <h1 className="text-2xl font-bold text-gray-900">TaskBoard</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-medium text-gray-600 sm:block">
              Autenticar como:
            </span>

            <Select value={profile.id} onValueChange={handleSelectProfile}>
              <SelectTrigger className={cn('w-[200px]', 'sm:w-[250px]')}>
                <SelectValue placeholder="Selecionar usuário">
                  {profile && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="text-xs">
                          {profile.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{profile.name}</span>
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

                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
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
