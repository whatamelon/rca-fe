import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { Button, ButtonProps, buttonVariants } from '@/lib/components/element/button/Button'

import { cn } from './utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  isNavigation?: boolean
  page?: number
  children?: React.ReactNode
  onClick?: (page: number) => void
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Button>

function PaginationLink({
  className,
  isActive,
  page,
  children,
  size = 'medium',
  onClick,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          fill: isActive ? 'black' : 'none',
          line: isActive ? 'black' : 'gray',
          size,
        }),
        className,
      )}
      {...props}
      onClick={() => onClick?.(page)}
    >
      {page ?? children ?? ''}
    </Button>
  )
}
PaginationLink.displayName = 'PaginationLink'

function PaginationPrevious({ className, onClick, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="medium"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
      onClick={onClick}
    >
      <ChevronLeft width={16} height={16} />
      <span>이전</span>
    </PaginationLink>
  )
}
PaginationPrevious.displayName = 'PaginationPrevious'

function PaginationNext({ className, onClick, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="medium"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
      onClick={onClick}
    >
      <span>다음</span>
      <ChevronRight width={16} height={16} />
    </PaginationLink>
  )
}
PaginationNext.displayName = 'PaginationNext'

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
      <MoreHorizontal width={16} height={16} />
      <span className="sr-only">More pages</span>
    </span>
  )
}
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
