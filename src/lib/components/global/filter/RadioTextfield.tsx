'use client'

import { Circle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import DynamicIcon from '@/lib/components/element/DynamicIcon'
import { RadioTextfieldProps } from '@/lib/types/component'
import { CodeNameObjectType, RecordStringArrayType } from '@/lib/types/global'

import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterRadioTextfield({
  title,
  placeholder,
  items,
  selectedItem,
  searchModel,
  textfieldIndex,
  setValue,
  updateValue,
  maxLength,
  seperatedValues = false,
}: RadioTextfieldProps) {
  const [childItems, setChildItems] = useState<RecordStringArrayType>([])
  const filterItems = useMemo(() => childItems, [childItems])

  /**
   * items의 변경때마다 함수 실행
   * @param useEffect
   */
  useEffect(() => {
    setChildItems(items)
  }, [items])

  /**
   * 라디오버튼으로 선택된 flag를 emit으로 보내는 함수
   */
  // FIXME: 라디오를 토글할때 기존 코드와 같으면 값 초기화 되는 로직이 없어야함. (사이드이펙트 확인 후 수정필요)
  const onSelectFilterItem = (code: string) => {
    let flag = selectedItem
    if (flag === code) flag = ''
    else flag = code
    setValue(flag)
    if (seperatedValues) updateValue('')
  }

  return (
    <div className="flex">
      {title && <CommonFilterTitleBox title={title} />}
      <div className="flex w-[calc(100%-120px)] gap-x-4 gap-y-2 px-2 py-1">
        {filterItems.map((item: CodeNameObjectType, idx: number) => (
          <span key={item.code} className="flex">
            <Button onClick={() => onSelectFilterItem(item.code)} className="flex w-fit pr-2" key={item.code}>
              <span className="inline-flex h-fit cursor-pointer pr-3">
                {selectedItem === item.code && (
                  <Circle
                    name="circle"
                    fill="#3b82f6"
                    stroke="transparent"
                    className="rounded-full border-[2px] border-gray-300 p-0.5"
                  />
                )}
                {selectedItem !== item.code && <DynamicIcon name="circle" className="text-gray-300" />}
                <span className="body-1-r my-auto">{item.name}</span>
              </span>
            </Button>

            {/* textfieldIndex 값을 통해 몇번째 체크박스 뒤에 텍스트필드가 위치하게 만들 수 있음  */}
            {textfieldIndex === idx && (
              <input
                value={searchModel}
                className="subhead-2-b placeholder:text-tiny w-30 rounded-md border px-4 py-1 placeholder:leading-20 placeholder:font-normal hover:border-blue-500 focus:border-blue-500"
                onChange={(e) => updateValue(e.target.value)}
                maxLength={maxLength}
                placeholder={placeholder}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
