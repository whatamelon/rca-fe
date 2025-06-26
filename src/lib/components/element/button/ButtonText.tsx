import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../utils'

const buttonTextVariants = cva(
  'inline-flex items-center justify-center gap-0.5 whitespace-nowrap focus-visible:outline-none disabled:text-gray-100 disabled:pointer-events-none',
  {
    variants: {
      size: {
        small: 'subhead-2-b',
        medium: 'subhead-3-b',
        large: 'headline-b',
      },
      color: {
        gray300: 'text-gray-300',
        gray600: 'text-gray-600',
        black: 'text-black',
      },
    },
  },
)

export interface ButtonTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonTextVariants> {
  asChild?: boolean
  color: 'gray300' | 'gray600' | 'black'
}

const ButtonText = React.forwardRef<HTMLButtonElement, ButtonTextProps>(
  ({ className, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonTextVariants({
            size,
            color,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
ButtonText.displayName = 'ButtonText'

export { ButtonText, buttonTextVariants }
