'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/element/select/Dropdown'
import { FilterMultipleSelectProps } from '@/lib/types/component'
import { GlobalCode } from '@/lib/types/global'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterMultipleSelect({
  title,
  useDepth = 1,
  oneList,
  selectedOne,
  setOneValue,
  setOnePlaceholder,
  twoList,
  selectedTwo,
  setTwoValue,
  setTwoPlaceholder,
  threeList,
  selectedThree,
  setThreeValue,
  setThreePlaceholder,
  className,
}: FilterMultipleSelectProps<GlobalCode>) {
  return (
    <div className={cn('flex', className)}>
      {title && <CommonFilterTitleBox title={title} />}

      <div className="my-auto flex flex-wrap gap-2 px-2">
        <Select value={selectedOne} onValueChange={(value) => setOneValue(value)}>
          <SelectTrigger className="my-auto h-6 w-[100px]">
            <SelectValue placeholder={setOnePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {oneList.map((item) => (
              <SelectItem key={`one_depth-${item.code}-${item.name}`} value={item.code}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {useDepth >= 2 && (
          <Select disabled={!selectedOne} value={selectedTwo} onValueChange={(value) => setTwoValue(value)}>
            <SelectTrigger className="my-auto h-6 w-[100px]">
              <SelectValue placeholder={setTwoPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {twoList.map((item) => (
                <SelectItem key={`two_depth-${item.code}-${item.name}`} value={item.code}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {useDepth >= 3 && (
          <Select disabled={!selectedTwo} value={selectedThree} onValueChange={(value) => setThreeValue(value)}>
            <SelectTrigger className="my-auto h-6 w-[100px]">
              <SelectValue placeholder={setThreePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {threeList.map((item) => (
                <SelectItem key={`three_depth-${item.code}-${item.name}`} value={item.code}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}
