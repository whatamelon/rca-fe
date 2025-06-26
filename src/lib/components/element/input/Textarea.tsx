'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../utils'

const textareaVariants = cva(
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <textarea
      rows={2}
      className={cn(
        textareaVariants({
          variant,
          className,
        }),
      )}
      ref={ref}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
