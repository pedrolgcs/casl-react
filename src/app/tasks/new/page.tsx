import { CreateTask } from '@/modules/task/create-task'
import { ability } from '@/utils/ssr-ability'

export default async function NewTask() {
  const permissions = await ability()

  // SSR
  if (permissions?.cannot('create', 'Task')) {
    return <div>unauthorized</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">New Task</h1>

      <CreateTask />
    </div>
  )
}
