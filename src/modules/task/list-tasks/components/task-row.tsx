import dayjs from 'dayjs'
import { EyeIcon, NotebookPenIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { taskSchema } from '@/lib/casl'
import { useAbility } from '@/modules/authentication'

type TaskRowProps = {
  task: {
    id: string
    title: string
    description: string
    createdBy: string
    createdByName: string
    createdAt: string
  }
}

export function TaskRow({ task }: TaskRowProps) {
  const { ability } = useAbility()

  const canDeleteTask = ability.can(
    'delete',
    taskSchema.parse({ ownerId: task.createdBy }),
  )

  const canEditTask = ability?.can(
    'update',
    taskSchema.parse({ ownerId: task.createdBy }),
  )

  return (
    <TableRow key={task.id}>
      <TableCell className="max-w-[150px] font-medium break-words whitespace-normal">
        {task.title}
      </TableCell>
      <TableCell className="max-w-[400px] break-words whitespace-normal">
        {task.description}
      </TableCell>
      <TableCell>{task.createdByName}</TableCell>
      <TableCell>{dayjs(task.createdAt).format('DD/MM/YYYY')}</TableCell>
      <TableCell className="flex w-36 items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-emerald-700 hover:text-emerald-600"
        >
          <EyeIcon />
        </Button>

        {canEditTask && (
          <Button
            variant="ghost"
            size="icon"
            className="text-sky-700 hover:text-sky-600"
          >
            <NotebookPenIcon />
          </Button>
        )}

        {canDeleteTask && (
          <Button
            variant="ghost"
            size="icon"
            className="text-rose-700 hover:text-rose-600"
          >
            <Trash2Icon />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
