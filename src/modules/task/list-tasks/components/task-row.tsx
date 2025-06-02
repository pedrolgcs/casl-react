import dayjs from 'dayjs'
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  CircleCheckIcon,
  NotebookPenIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useToggleTaskHighlight } from '@/http/hooks/use-toggle-task-highlight'
import { taskSchema } from '@/lib/casl'
import { useAbility } from '@/modules/authentication'

type TaskRowProps = {
  task: {
    id: string
    title: string
    description: string
    createdBy: string
    createdByName: string
    highlighted: boolean
    createdAt: string
  }
}

export function TaskRow({ task }: TaskRowProps) {
  const { ability } = useAbility()

  const { mutate: toggleTaskHighlight } = useToggleTaskHighlight()

  const canCompleteTask = ability.can(
    'complete',
    taskSchema.parse({ ownerId: task.createdBy }),
  )

  const canHighlightTask = ability.can(
    'highlight',
    taskSchema.parse({ ownerId: task.createdBy }),
  )

  const canDeleteTask = ability.can(
    'delete',
    taskSchema.parse({ ownerId: task.createdBy }),
  )

  const canEditTask = ability?.can(
    'update',
    taskSchema.parse({ ownerId: task.createdBy }),
  )

  const handleToggleTaskHighlight = () => {
    toggleTaskHighlight({ id: task.id, highlighted: !task.highlighted })
  }

  return (
    <TableRow key={task.id}>
      <TableCell className="max-w-[50px]">
        {task.highlighted ? (
          <ArrowUpRightIcon className="size-5 text-sky-500" />
        ) : (
          <ArrowDownRightIcon className="size-5 text-amber-500" />
        )}
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
        {canCompleteTask && (
          <Button
            variant="ghost"
            size="icon"
            className="text-emerald-700 hover:text-emerald-600"
          >
            <CircleCheckIcon />
          </Button>
        )}

        {canHighlightTask && (
          <Button
            variant="ghost"
            size="icon"
            className="text-yellow-500 hover:text-yellow-400"
            onClick={handleToggleTaskHighlight}
          >
            <StarIcon fill={task.highlighted ? 'currentColor' : 'none'} />
          </Button>
        )}

        {canEditTask && (
          <Button
            variant="ghost"
            size="icon"
            className="text-sky-700 hover:text-sky-600"
            asChild
          >
            <Link href={`/tasks/${task.id}/edit`}>
              <NotebookPenIcon />
            </Link>
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
