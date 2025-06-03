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
import { useEditTask } from '@/http/hooks/use-edit-task'
import type { Task } from '@/types/task'

const editTaskSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(3, {
    message: 'Description must be at least 3 characters',
  }),
  highlighted: z.boolean(),
})

type EditTaskFormData = z.infer<typeof editTaskSchema>

type EditTaskFormProps = {
  task: Task
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const router = useRouter()

  const { mutate: editTask } = useEditTask()

  const { register, handleSubmit, control, formState } =
    useForm<EditTaskFormData>({
      resolver: zodResolver(editTaskSchema),
      defaultValues: {
        title: task.title,
        description: task.description,
        highlighted: task.highlighted,
      },
    })

  const handleEditTask = async (data: EditTaskFormData) => {
    const { title, description, highlighted } = data

    editTask(
      {
        id: task.id,
        title,
        description,
        highlighted,
      },
      {
        onSuccess: () => {
          toast.success('Task updated successfully')
          router.push('/')
        },
        onError: () => {
          toast.error('Error updating task')
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditTask)}
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
        Edit task
      </Button>
    </form>
  )
}
