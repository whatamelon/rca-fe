'use client'

/* eslint-disable no-nested-ternary */
import { Circle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import { RadioProps } from '@/lib/types/component'
import { CodeNameObjectType, RecordStringArrayType } from '@/lib/types/global'

import DynamicIcon from '@/lib/components/element/DynamicIcon'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterRadio({ title, items, selectedItem, isLine = false, setValue }: RadioProps) {
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
    if (selectedItem === code) {
      setValue(null)
    } else {
      setValue(code)
    }
  }

  return (
    <div className="flex">
      {title && <CommonFilterTitleBox title={title} />}
      <div className="flex flex-wrap items-center px-2 py-1">
        {filterItems.map((item: CodeNameObjectType) => (
          <Button onClick={() => onSelectFilterItem(item.code)} key={item.code}>
            <span className="inline-flex h-fit cursor-pointer pr-3">
              {isLine && item.code === filterItems[filterItems.length - 1].code && (
                <span className="mr-3 block h-[36px] w-[1px] bg-gray-200" />
              )}
              {selectedItem === null ? (
                <DynamicIcon name="circle" className="text-gray-300" />
              ) : selectedItem === item.code ? (
                <Circle
                  name="circle"
                  fill="#3b82f6"
                  stroke="transparent"
                  className="rounded-full border-[2px] border-gray-300 p-0.5"
                />
              ) : (
                <DynamicIcon name="circle" className="text-gray-300" />
              )}
              <span className="body-1-r my-auto">{item.name}</span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
