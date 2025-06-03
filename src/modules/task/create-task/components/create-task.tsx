'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { NotebookPenIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { InputError } from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateTask } from '@/http/hooks/use-create-task'
import { useAppStore } from '@/store'

const createTaskSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(3, {
    message: 'Description must be at least 3 characters',
  }),
  highlighted: z.boolean(),
})

type CreateTaskFormData = z.infer<typeof createTaskSchema>

export function CreateTask() {
  const router = useRouter()

  const user = useAppStore((state) => state.profile)

  const { mutate: createTask } = useCreateTask()

  const { register, handleSubmit, control, formState } =
    useForm<CreateTaskFormData>({
      resolver: zodResolver(createTaskSchema),
      defaultValues: {
        highlighted: false,
      },
    })

  const handleCreateTask = async (data: CreateTaskFormData) => {
    const { title, description, highlighted } = data

    createTask(
      {
        title,
        description,
        createdBy: user.id,
        createdByName: user.name,
        highlighted,
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
      className="flex w-full flex-col gap-6"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} />
        {formState.errors.title && (
          <InputError>{formState.errors.title.message}</InputError>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...register('description')} />
        {formState.errors.description && (
          <InputError>{formState.errors.description.message}</InputError>
        )}
      </div>

      <Controller
        name="highlighted"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="highlighted"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <Label htmlFor="highlighted">Highlighted</Label>
            </div>
            {formState.errors.highlighted && (
              <InputError>{formState.errors.highlighted.message}</InputError>
            )}
          </div>
        )}
      />

      <Button type="submit">
        <NotebookPenIcon />
        Create Task
      </Button>
    </form>
  )
}
