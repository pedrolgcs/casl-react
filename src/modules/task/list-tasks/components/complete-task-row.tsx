import dayjs from 'dayjs'
import { CheckIcon, Undo2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { Task } from '@/types/task'

type CompleteTaskRowProps = {
  task: Task
}

export function CompleteTaskRow({ task }: CompleteTaskRowProps) {
  return (
    <TableRow key={task.id} className="text-slate-400 line-through">
      <TableCell className="max-w-[50px]">
        <CheckIcon className="size-5 text-slate-400" />
      </TableCell>

      <TableCell className="max-w-[150px] font-medium break-words whitespace-normal">
        {task.title}
      </TableCell>

      <TableCell className="max-w-[400px] break-words whitespace-normal">
        {task.description}
      </TableCell>

      <TableCell>{task.createdByName}</TableCell>

      <TableCell>{dayjs(task.createdAt).format('DD/MM/YYYY')}</TableCell>

      <TableCell className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-emerald-500 hover:text-emerald-400"
        >
          <Undo2Icon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
