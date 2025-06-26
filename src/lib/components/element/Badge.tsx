import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from './utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      size: {
        tiny: 'h-[18px] caption-b px-1.5',
        small: 'h-[22px] caption-b px-2',
        medium: 'h-[26px] subhead-2-b px-2',
        large: 'h-[30px] subhead-3-b px-3',
      },
      fill: {
        black: 'bg-black text-white',
        white: 'bg-white text-black',
        red: 'bg-red-100 text-red-600 border border-red-600',
        yellow: 'bg-yellow-100 text-yellow-600 border border-yellow-600',
        blue: 'bg-blue-100 text-blue-600 border border-blue-600',
        green: 'bg-caribbeangreen-200 text-black text-caribbeangreen-950 border-caribbeangreen-950',
        caribbeanGreen: 'bg-caribbeangreen-300 text-black border border-caribbeangreen-950',
        orange: 'bg-orange-100 text-orange-600 border border-orange-600',
        gray: 'bg-gray-50 text-black border border-gray-500',
        grayText: 'bg-gray-50 text-gray-600 border border-gray-500',
        none: 'bg-transparent text-black',
      },
      line: {
        black: 'border border-black',
        gray: 'border border-gray-100',
      },
      rounded: {
        small: 'rounded-[4px]',
        full: 'rounded-full',
      },
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, size, fill, line, rounded, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          size,
          fill,
          line,
          rounded,
        }),
        className,
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
