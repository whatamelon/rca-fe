'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleDot } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/components/element/utils'

const RadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
))
RadioButton.displayName = RadioGroupPrimitive.Root.displayName

const RadioButtonItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'ring-none h-6 w-6 !rounded-full border border-gray-100 !ring-0 !ring-transparent !ring-offset-0',
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <CircleDot className="h-5 w-5 text-black" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioButtonItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioButton, RadioButtonItem }
