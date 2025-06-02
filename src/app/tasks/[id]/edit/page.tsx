import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { EditTask } from '@/modules/task/edit-task'
import { ability } from '@/utils/ssr-ability'

type EditTaskPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id: ticketId } = await params

  const permissions = await ability()

  // SSR
  if (!permissions?.can('update', 'Task')) {
    return <div>unauthorized</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Task</h1>

        <Button variant="link" className="text-slate-500" asChild>
          <Link href="/">
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <EditTask id={ticketId} />
    </div>
  )
}
