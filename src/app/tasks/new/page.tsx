import { CreateTask } from '@/modules/task/create-task'

export default function NewTask() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">New Task</h1>
      <CreateTask />
    </div>
  )
}
