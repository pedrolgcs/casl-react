'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { NotebookPenIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateTask } from '@/http/hooks/use-create-task'
import { useAppStore } from '@/store'

const createTaskSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
})

type CreateTaskFormData = z.infer<typeof createTaskSchema>

export function CreateTask() {
  const router = useRouter()

  const user = useAppStore((state) => state.profile)

  const { mutate: createTask } = useCreateTask()

  const { register, handleSubmit, formState } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
  })

  const handleCreateTask = async (data: CreateTaskFormData) => {
    const { title, description } = data

    createTask(
      {
        title,
        description,
        createdBy: user.id,
        createdByName: user.name,
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success('Task created successfully')
          router.push('/')
        },
        onError: () => {
          toast.error('Error creating task')
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateTask)}
      className="flex w-full flex-col gap-4"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} />
        {formState.errors.title && (
          <p className="text-red-500">{formState.errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...register('description')} />
        {formState.errors.description && (
          <p className="text-red-500">{formState.errors.description.message}</p>
        )}
      </div>

      <Button type="submit">
        <NotebookPenIcon />
        Create Task
      </Button>
    </form>
  )
}
