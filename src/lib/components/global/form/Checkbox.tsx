'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/components/element/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `m-0.5 h-5 w-5 shrink-0 rounded-sm ring-2 ring-gray-100 ring-inset data-[state=checked]:bg-black data-[state=checked]:ring-0 ${error && 'ring-error'}`,
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex h-5 w-5 items-center justify-center')}>
      <Check className="h-5 w-5 text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
