'use client'

import dayjs from 'dayjs'
import { CopyIcon, EllipsisVerticalIcon, LockKeyholeIcon } from 'lucide-react'

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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetTasks } from '@/http/hooks/use-get-tasks'

export function ListTasks() {
  const { data: tasks } = useGetTasks()

  return (
    <Table>
      <TableCaption>total of {tasks?.length} tasks</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Create by</TableHead>
          <TableHead>Create at</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tasks?.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.title}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.createdByName}</TableCell>
            <TableCell>
              {dayjs(invoice.createdAt).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell className="text-right">
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
                    <DropdownMenuItem>
                      <CopyIcon />
                      Copy
                      <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <LockKeyholeIcon />
                      Revoke Access
                      <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
