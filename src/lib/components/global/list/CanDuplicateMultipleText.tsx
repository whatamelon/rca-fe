'use client'

import { XIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import { CanDuplicateMultipleTextProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'

export default function CommonCanDuplicateMultipleText({
  items,
  where,
  useType,
  placeHolder,
  textHidden,
  className,
  add,
  remove,
}: CanDuplicateMultipleTextProps) {
  const [inputText, setInputText] = useState<string>('')

  /**
   * 입력한 텍스트를 multitext에 추가하는 함수
   */
  const onClickBox = () => {
    document.getElementById(`filter_${where}_${useType}_multitext_input_box`)!.focus()
  }
  const onRemove = (code: string) => {
    remove(code)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      add(inputText)
      setInputText('')
    }
  }
  /**
   * multitext input box를 클릭했을 때 focus 이동
   */
  const onUpdateInputValue = (rawText: string) => {
    if (rawText.length > 13) {
      setInputText(rawText.substr(0, 13))
    } else {
      setInputText(rawText)
    }
  }

  return (
    <div className={cn(className)}>
      <div className="flex w-full space-x-1 py-1">
        <Button
          onClick={onClickBox}
          className="subhead-2-b inline-block w-full space-y-1 space-x-1 rounded-md border px-2 pb-1 hover:border-3 hover:border-blue-500 focus:border-3 focus:border-blue-500"
        >
          {items.length > 0 &&
            items.map((item) => (
              <Button fill="gray" size="small" rounded="lg" onClick={() => onRemove(item)}>
                <p>{item}</p>
                <XIcon className="h-4 w-4" fill="gray" />
              </Button>
            ))}

          <input
            id={`filter_${where}_${useType}__multitext_input_box`}
            value={inputText}
            placeholder={`${items?.length === 0 ? `${placeHolder} 입력하고 엔터를 누르세요` : ''}`}
            onChange={(e) => onUpdateInputValue(e.target.value)}
            onKeyDown={(e) => onKeyDown(e)}
          />
        </Button>
      </div>
      {!textHidden && <p className="body-1-r pl-2 text-blue-500">{items.length}개 태그됨</p>}
    </div>
  )
}
