'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetTasks } from '@/http/hooks/use-get-tasks'

import { CompleteTaskRow } from './complete-task-row'
import { PendingTaskRow } from './pending-task-row'

export function ListTasks() {
  const { data: tasks } = useGetTasks()

  const completeTasks = tasks?.filter((task) => task.completed)

  const pendingTasks = tasks?.filter((task) => !task.completed)

  return (
    <Table>
      <TableCaption>total of {tasks?.length} tasks</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[50px]">Priority</TableHead>
          <TableHead className="max-w-[150px]">Title</TableHead>
          <TableHead className="max-w-[400px]">Description</TableHead>
          <TableHead>Create by</TableHead>
          <TableHead>Create at</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {pendingTasks?.map((task) => (
          <PendingTaskRow key={task.id} task={task} />
        ))}

        {completeTasks?.map((task) => (
          <CompleteTaskRow key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  )
}
