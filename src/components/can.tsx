import { createContextualCan } from '@casl/react'

import { AbilityContext } from '@/context/ability-provider'

export const Can = createContextualCan(AbilityContext.Consumer)
