'use client'

import { useMemo } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/element/select/Dropdown'
import { FilterSelectedTextfieldProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterSelectedTextfield({
  title,
  placeholder,
  searchModel,
  suffix,
  maxLength,
  updateValue,
  className,
  items,
  selectedItem,
  setValue,
}: FilterSelectedTextfieldProps) {
  const charLength = useMemo(() => (searchModel ? searchModel.length : 0), [searchModel])

  return (
    <div className={`${cn(className, 'flex w-full')}`}>
      {title && <CommonFilterTitleBox title={title} />}
      <div className="w-[calc(100%-120px)]">
        <div className="relative flex w-full space-x-2 px-2 py-1">
          <Select onValueChange={setValue} value={selectedItem}>
            <SelectTrigger className="h-10 w-1/5 rounded-sm bg-white py-2">
              <SelectValue defaultValue={selectedItem} placeholder="선택해주세요." />
            </SelectTrigger>
            <SelectContent sticky="partial" position="popper" sideOffset={0}>
              {items.map((optionValue) => (
                <SelectItem key={optionValue.code} value={optionValue.code}>
                  {optionValue.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            type="text"
            disabled={!selectedItem}
            value={searchModel ?? ''}
            maxLength={maxLength}
            className="subhead-2-b placeholder:text-tiny w-4/5 rounded-md border px-4 py-1 placeholder:leading-20 placeholder:font-normal hover:border-blue-500 focus:border-blue-500"
            placeholder={items.find((item) => item.code === selectedItem)?.placeholder ?? placeholder}
            onChange={(e) => updateValue(e.target.value)}
          />
          {suffix && <span className="subhead-3-b my-auto text-gray-600">{suffix}</span>}
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
