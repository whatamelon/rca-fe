'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../utils'

const textfieldVariants = cva(
  'body-1-r focus:text-black h-[52px] focus-visible:text-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background border rounded-none bg-background placeholder:text-gray-400 text-black flex w-full p-4 ring-transparent',
  {
    variants: {
      variant: {
        default: 'border-gray-100 focus:border-black focus-visible:border-black',
        error: 'border-orange-600 focus:border-orange-600 focus-visible:border-orange-600',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textfieldVariants> {}

const Textfield = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => (
    <input
      type={type}
      className={cn(
        textfieldVariants({
          variant,
          className,
        }),
      )}
      ref={ref}
      {...props}
    />
  ),
)
Textfield.displayName = 'Textfield'

export { Textfield, textfieldVariants }
