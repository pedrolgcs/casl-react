'use client'

import { useGetTask } from '@/http/hooks/use-get-task'

import { EditTaskForm } from './edit-task-form'

type EditTaskProps = {
  id: string
}

export function EditTask({ id }: EditTaskProps) {
  const { data: task, isPending: isPendingOnGetTask } = useGetTask({ id })

  if (isPendingOnGetTask) {
    return <div>loading...</div>
  }

  return <div>{task && <EditTaskForm task={task} />}</div>
}
