'use client'

import { ReactNode } from 'react'

import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonEmptyField({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex ${className}`}>
      {title && <CommonFilterTitleBox title={title} />}
      <div className="relative flex h-full w-full items-center space-x-2 px-2 py-1">{children}</div>
    </div>
  )
}
