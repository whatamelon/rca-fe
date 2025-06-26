'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import DynamicIcon from '@/lib/components/element/DynamicIcon'
import { FilterTextfieldProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterTextfield({
  title,
  placeholder,
  searchModel,
  suffix,
  maxLength,
  typePassword,
  updateValue,
  className,
  disabled = false,
}: FilterTextfieldProps) {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const charLength = useMemo(() => (searchModel ? searchModel.length : 0), [searchModel])

  return (
    <div className={`${cn(className, 'flex w-full')}`}>
      {title && <CommonFilterTitleBox title={title} />}
      <div className="w-[calc(100%-120px)]">
        <div className="relative flex w-full space-x-2 px-2 py-1">
          <input
            type={typePassword && !viewPassword ? 'password' : 'text'}
            value={searchModel}
            maxLength={maxLength}
            className={`subhead-2-b placeholder:text-tiny w-full rounded-md border px-4 placeholder:leading-20 placeholder:font-normal hover:border-blue-500 focus:border-blue-500 ${typePassword && 'pr-8'} py-2 disabled:!bg-gray-100 disabled:!text-gray-500 disabled:hover:!border-gray-200 disabled:focus:!border-gray-200`}
            placeholder={placeholder}
            onChange={(e) => updateValue(e.target.value)}
            disabled={disabled}
          />
          {suffix && <span className="subhead-3-b my-auto text-gray-600">{suffix}</span>}
          {typePassword && (
            <Button
              className="absolute top-1/2 right-6 -translate-y-1/2"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {!viewPassword && (
                <DynamicIcon name={!viewPassword ? 'eye' : 'eye-off'} className="text-base text-gray-400" />
              )}
            </Button>
          )}
        </div>
        {maxLength && (
          <span className="label-r pl-3 text-gray-400">
            {charLength} / {maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
