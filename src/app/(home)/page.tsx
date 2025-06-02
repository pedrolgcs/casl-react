import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ListTasks } from '@/modules/task/list-tasks'
import { ability } from '@/utils/ssr-ability'

export default async function Home() {
  const permissions = await ability()

  // SSR
  const canCreateTask = permissions?.can('create', 'Task')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Tasks</h1>
        {canCreateTask && (
          <Button variant="outline" asChild>
            <Link href="/tasks/new">
              <PlusIcon />
              Nova tarefa
            </Link>
          </Button>
        )}
      </div>

      <ListTasks />
    </div>
  )
}
