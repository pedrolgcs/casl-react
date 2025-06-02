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

import { TaskRow } from './task-row'

export function ListTasks() {
  const { data: tasks } = useGetTasks()

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
        {tasks?.map((task) => <TaskRow key={task.id} task={task} />)}
      </TableBody>
    </Table>
  )
}
