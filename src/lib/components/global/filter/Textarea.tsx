'use client'

import { useMemo } from 'react'

import { FilterTextareaProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterTextarea({
  title,
  placeholder,
  searchModel,
  maxLength,
  updateValue,
  className,
  rows = 5,
}: FilterTextareaProps) {
  const charLength = useMemo(() => searchModel?.length || 0, [searchModel])
  return (
    <div className={`${cn(className, 'flex w-full')}`}>
      {title && <CommonFilterTitleBox title={title} />}
      <div className="w-[calc(100%-120px)]">
        <div className="relative flex w-full space-x-2 px-2 py-1">
          <textarea
            value={searchModel}
            maxLength={maxLength}
            className="subhead-2-b placeholder:text-tiny w-full resize-none rounded-md border px-4 py-1 placeholder:leading-20 placeholder:font-normal hover:border-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            onChange={(e) => updateValue(e.target.value)}
            rows={rows}
          />
        </div>
        {maxLength && (
          <span className="body-1-r pl-3 text-gray-400">
            {charLength} / {maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
