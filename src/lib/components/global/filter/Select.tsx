'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/element/select/Dropdown'
import { FilterSelectProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterSelect({
  title,
  placeholder,
  className,
  items,
  selectedItem,
  setValue,
  triggerWidth = 'w-1/5',
}: FilterSelectProps) {
  return (
    <div className={`${cn(className, 'flex w-full')}`}>
      {title && <CommonFilterTitleBox title={title} />}
      <div className="w-[calc(100%-120px)]">
        <div className="relative flex w-full space-x-2 px-2 py-1">
          <Select onValueChange={setValue} value={selectedItem}>
            <SelectTrigger className={cn(triggerWidth, 'h-10 rounded-sm bg-white py-2')}>
              <SelectValue defaultValue={selectedItem} placeholder={placeholder ?? '선택해주세요.'} />
            </SelectTrigger>
            <SelectContent sticky="partial" position="popper" sideOffset={0}>
              {items.map((optionValue) => (
                <SelectItem key={optionValue.code} value={optionValue.code}>
                  {optionValue.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
