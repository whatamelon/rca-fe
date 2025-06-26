'use client'

import { Square, SquareCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import { FilterCheckboxTextfieldProps } from '@/lib/types/component'
import { CodeNameObjectType, RecordStringArrayType } from '@/lib/types/global'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterCheckboxTextfield({
  title,
  items,
  selectedItems,
  searchModel,
  textfieldIndex,
  isButton,
  buttonText,
  setValue,
  updateValue,
  buttonClick,
  className,
}: FilterCheckboxTextfieldProps) {
  const [childItems, setChildItems] = useState<RecordStringArrayType>([])
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  useEffect(() => {
    setCheckedItems(selectedItems)
  }, [selectedItems])

  /**
   * 초기 props값 세팅 위한 useEffect
   * @param useEffect
   */
  useEffect(() => {
    setChildItems(items)
    setCheckedItems(selectedItems)
  }, [items])

  /**
   * 체크박스로 선택된 list를 부모로 보내는 함수
   * @param code
   */
  const onSelectFilterItem = (code: string) => {
    let list = selectedItems
    if (list.find((el) => el === code) === undefined) {
      list.push(code)
    } else {
      list = list.filter((el) => el !== code)
    }
    setValue(list)
  }

  return (
    <div className={cn('flex', className)}>
      <div className="flex h-full w-full">
        {title && <CommonFilterTitleBox title={title} />}
        <div className="flex w-[calc(100%-120px)] flex-wrap gap-x-4 gap-y-2 px-2 py-1">
          {childItems.map((item: CodeNameObjectType, idx: number) => (
            <span key={item.code} className="inline-flex cursor-pointer">
              <Button onClick={() => onSelectFilterItem(item.code)}>
                <div className="flex cursor-pointer">
                  {checkedItems.includes(item.code) === true && (
                    <SquareCheck fill="#3b82f6" color="#fff" className="text-24xl my-auto cursor-pointer" />
                  )}
                  {checkedItems.includes(item.code) === false && (
                    <Square color="#d1d5db" className="text-24xl my-auto cursor-pointer" />
                  )}

                  <span className="body-1-r my-auto">{item.name}</span>
                </div>
              </Button>

              {/* textfieldIndex 값을 통해 몇번째 체크박스 뒤에 텍스트필드가 위치하게 만들 수 있음  */}
              {textfieldIndex === idx && (
                <input
                  value={searchModel}
                  className="subhead-2-b placeholder:text-tiny ml-3 w-30 rounded-[8px] border border-gray-200 px-4 py-1 placeholder:leading-20 placeholder:font-normal hover:border-blue-500 focus:border-blue-500"
                  onChange={(e) => updateValue(e.target.value)}
                />
              )}
            </span>
          ))}
          {isButton && (
            <Button size="medium" fill="gray" rounded="lg" onClick={() => buttonClick}>
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
