import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../utils'

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-0.5 whitespace-nowrap text-black focus-visible:outline-none disabled:pointer-events-none disabled:bg-gray-200 disabled:text-white disabled:border-none',
  {
    variants: {
      size: {
        tiny: 'h-6 body-1-r px-2',
        small: 'h-8 subhead-2-b px-4',
        medium: 'h-9 subhead-2-b px-4',
        large: 'h-11 subhead-3-b px-6',
        xlarge: 'h-[52px] subhead-3-b px-6',
        xxlarge: 'h-[60px] subhead-3-b px-6',
      },
      fill: {
        none: 'bg-transparent',
        black: 'bg-black text-white',
        gray: 'bg-gray-200 text-black',
        white: 'bg-white text-black',
        blue: 'bg-blue-500 text-white',
        orange: 'bg-orange-600 text-white',
        red: 'bg-red-500 text-white',
      },
      line: {
        none: 'border-none',
        black: 'border border-black',
        gray: 'border border-gray-100',
        white: 'border border-white text-white',
        orange: 'border border-orange-600', // 주문서 ERROR
      },
      rounded: {
        lg: 'rounded-[8px]',
        full: 'rounded-full',
      },
      width: {
        md: '!w-[160px]',
        full: 'w-full',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, fill, line, rounded, width, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({
            size,
            fill,
            line,
            rounded,
            width,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
