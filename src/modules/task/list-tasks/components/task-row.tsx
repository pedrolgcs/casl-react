import dayjs from 'dayjs'
import {
  CopyIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  LockKeyholeIcon,
} from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

  const canDeleteTask = useMemo(() => {
    return ability?.can('delete', taskSchema.parse({ ownerId: task.createdBy }))
  }, [ability, task.createdBy])

  const canUpdateTask = useMemo(() => {
    return ability?.can('update', taskSchema.parse({ ownerId: task.createdBy }))
  }, [ability, task.createdBy])

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
      <TableCell className="w-20 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {canUpdateTask && (
                <DropdownMenuItem>
                  <CopyIcon />
                  Update
                  <DropdownMenuShortcut>⇧⌘U</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}

              {canDeleteTask && (
                <DropdownMenuItem>
                  <LockKeyholeIcon />
                  Revoke Access
                  <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem>
                <EyeIcon />
                Read
                <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
