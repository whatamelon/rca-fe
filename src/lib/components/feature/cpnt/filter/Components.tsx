/* eslint-disable no-nested-ternary */

'use client'

import CommonFilterRadio from '@/lib/components/global/filter/Radio'
import CommonFilterSelectedTextfield from '@/lib/components/global/filter/SelectedTextfield'
import { Button } from '@/lib/components/element/button/Button'
import { FeatureComponentFilterProps } from '@/lib/types/filter'

const useFlagItems = [
  { code: 'y', name: '사용' },
  { code: 'n', name: '미사용' },
]
const searchItems = [
  { code: 'title', name: '제목', placeholder: '제목을 입력해주세요.' },
  { code: 'body', name: '내용', placeholder: '내용을 입력해주세요.' },
  { code: 'prodId', name: '판매상품 ID', placeholder: '판매상품 ID를 입력해주세요.' },
]

export default function FeatureComponentFilter({
  useFlag,
  setUseFlag,
  inputValue,
  setInputValue,
  selectedItem,
  setSelectedItem,
  searchData,
  resetFilter,
}: FeatureComponentFilterProps) {
  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      <CommonFilterRadio
        title="사용여부"
        items={useFlagItems}
        selectedItem={useFlag === null ? null : useFlag === true ? 'y' : 'n'}
        setValue={(value: string | null) => {
          if (value === null) setUseFlag(null)
          else if (value === 'y') setUseFlag(true)
          else if (value === 'n') setUseFlag(false)
        }}
        className="w-full"
      />
      <CommonFilterSelectedTextfield
        title="검색"
        placeholder="검색 조건을 선택해주세요."
        searchModel={inputValue}
        updateValue={setInputValue}
        className="w-full"
        items={searchItems}
        selectedItem={selectedItem}
        setValue={setSelectedItem}
      />
      <div className="mx-auto my-2 flex w-fit gap-2">
        <Button size="large" rounded="full" fill="blue" onClick={searchData} width="md" className="flex">
          검색
        </Button>

        <Button size="large" rounded="full" line="black" onClick={resetFilter} width="md" className="flex">
          초기화
        </Button>
      </div>
    </div>
  )
}
