import { Square, SquareCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import { FilterCheckboxProps } from '@/lib/types/component'
import { CodeNameObjectType, RecordStringArrayType } from '@/lib/types/global'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterCheckbox({
  title,
  items,
  selectedItems,
  isNotEntire,
  setValue,
  className,
}: FilterCheckboxProps) {
  const [childItems, setChildItems] = useState<RecordStringArrayType>([])

  const [checkedItems, setCheckedItems] = useState<string[]>([])

  /**
   * 전체선택을 위한 useEffect
   * @param useEffect
   */
  useEffect(() => {
    setCheckedItems(selectedItems)
    if (!isNotEntire && selectedItems.length === childItems.length - 1) {
      setCheckedItems(['', ...selectedItems])
    }
  }, [selectedItems])

  /**
   * items의 변경때마다 함수 실행
   * @param useEffect
   */
  useEffect(() => {
    setCheckedItems(selectedItems)
    if (!isNotEntire && childItems.find((item) => item.code === '') === undefined) {
      setChildItems([
        {
          code: '',
          name: '전체',
        },
        ...items,
      ])
    }
  }, [items])

  /**
   * 체크박스로 선택된 list를 리턴하는 list를 checkedItem변수에 담는 함수
   * @name onSelectFilterItem
   * @param code
   */
  const onSelectFilterItem = (code: string) => {
    let list = checkedItems

    if (list.find((el) => el === code) === undefined) {
      // 전체선택
      if (code === '') {
        list = items.map((e) => e.code)
      } else if (code !== '' && list.length === items.length - 1) {
        list = items.map((e) => e.code)
      } else {
        list.push(code)
      }
    } else if (list.length === items.length + 1) {
      if (code === '') {
        list = []
      } else {
        list = list.filter((el) => el !== code)
      }
    } else {
      list = list.filter((el) => el !== code)
    }

    list = list.filter((el) => el !== '')
    setCheckedItems(list)
    setValue([...list])
  }

  return (
    <div className={cn('flex', className)}>
      {title && <CommonFilterTitleBox title={title} />}

      <div className="items-center px-2 py-1">
        {childItems.map((item: CodeNameObjectType) => (
          <Button key={item.code} onClick={() => onSelectFilterItem(item.code)}>
            <span className="inline-flex h-fit cursor-pointer pr-3">
              {checkedItems.includes(item.code) === true && (
                <SquareCheck fill="#3b82f6" color="#fff" className="text-24xl my-auto cursor-pointer" />
              )}
              {checkedItems.includes(item.code) === false && (
                <Square color="#d1d5db" className="text-24xl my-auto cursor-pointer" />
              )}

              <span className="body-1-r my-auto">{item.name}</span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
