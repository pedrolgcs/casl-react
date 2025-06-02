import dayjs from 'dayjs'
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  NotebookPenIcon,
  StarIcon,
} from 'lucide-react'
import Link from 'next/link'

import { Can } from '@/components/can'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useAbility } from '@/context/ability-provider'
import { useToggleTaskHighlight } from '@/http/hooks/use-toggle-task-highlight'
import { taskSchema } from '@/lib/casl'
import { CompleteTask } from '@/modules/task/complete-task'
import { DeleteTask } from '@/modules/task/delete-task'
import type { Task } from '@/types/task'

type PendingTaskRowProps = {
  task: Task
}

export function PendingTaskRow({ task }: PendingTaskRowProps) {
  const { ability } = useAbility()

  const { mutate: toggleTaskHighlight } = useToggleTaskHighlight()

  const parsedTask = taskSchema.parse({ ownerId: task.createdBy })

  const canDeleteTask = ability.can('delete', parsedTask)

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
        <Can I="complete" a="Task">
          <CompleteTask id={task.id} />
        </Can>

        {/* <Can I="create" a="Task" passThrough>
          {(allowed) => (
            <Button size="sm" disabled={!allowed}>
              example
            </Button>
          )}
        </Can> */}

        <Can I="highlight" a="Task">
          <Button
            variant="ghost"
            size="icon"
            className="text-yellow-500 hover:text-yellow-400"
            onClick={handleToggleTaskHighlight}
          >
            <StarIcon fill={task.highlighted ? 'currentColor' : 'none'} />
          </Button>
        </Can>

        <Can I="update" this={parsedTask}>
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
        </Can>

        {canDeleteTask && <DeleteTask id={task.id} />}
      </TableCell>
    </TableRow>
  )
}
