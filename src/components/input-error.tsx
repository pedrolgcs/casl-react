type InputErrorProps = {
  children: React.ReactNode
}

export function InputError({ children }: InputErrorProps) {
  return <p className="text-sm text-red-500">{children}</p>
}
