import { LockIcon, ScanHeartIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { SignIn } from '@/modules/authentication/sign-in'

export default function SignInPage() {
  return (
    <div className={cn('flex w-full flex-col gap-4', 'sm:max-w-lg')}>
      <div className="flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <LockIcon className="h-5 w-5" />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <ScanHeartIcon className="h-5 w-5" />
        </div>
      </div>

      <SignIn />
    </div>
  )
}
