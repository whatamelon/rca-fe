/**
 * ==============================================================================
 * @fileoverview CombineActDataDialog
 * @description CombineActDataDialog 컴포넌트를 정의합니다.
 * @description 현재 활성화된 필터 데이터를 조합하여 이동경로와 필터를 표시합니다.
 * 
 * 25.06 사용 필터 조합.(아래참고) 
 * 카테고리1, 카테고리2, 카테고리3 - cat1, cat2, cat3
 * 사이즈1, 사이즈2, 사이즈3 - size1, size2, size3
 * 색상 - color
 * 골프 - golf
 * 가격 - price
 * 정렬 - order
 * 브랜드 - brand
 * 등급 - grade
 * 계절 - season
 * 유형 - type
 * 
 * @module feature/cpnt/filter/CombineActDataDialog
 * ==============================================================================
 */

'use client'

import { CopyIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader, 
  DialogTitle,
} from '@/lib/components/global/dialog/Dialog'
import CommonFilterCheckbox from '@/lib/components/global/filter/Checkbox'
import CommonFilterMultipleSelect from '@/lib/components/global/filter/MultipleSelect'
import CommonFilterRadio from '@/lib/components/global/filter/Radio'
import CommonListCellBig from '@/lib/components/global/list/CellBig'
import Loading from '@/lib/components/global/Loading'
import { Button } from '@/lib/components/element/button/Button'
import { ScrollArea } from '@/lib/components/element/ScrollArea'
import { useAppSelector } from '@/lib/stores/hooks'
import { useGetCategoryQuery, useGetFiltersQuery } from '@/lib/stores/service/filterApiSlice'
import { getActiveBrand } from '@/lib/stores/slice/appSlice'
import {
  CategoryData,
  FilterBrandItem,
  FilterColorItem,
  FilterData,
  FilterGolfItem,
  FilterGradeItem,
  FilterPriceItem,
  FilterSeasonItem,
  FilterTypeItem,
  SizeCategory,
} from '@/lib/types/filter'
import { GlobalCode } from '@/lib/types/global'
import { copyToClipboard } from '@/lib/utils/hook/copyToClipboard'
import ComputeActiveFilter from '@/lib/utils/hook/useComputeActiveFilter'

export default function CombineActDataDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const activeBrand = useAppSelector(getActiveBrand)
  if (!activeBrand.filterUrlName) {
    return null
  }

  /**
   * 필터 데이터
   */
  const [filter, setFilter] = useState<FilterData | null>(null)

  /**
   * 카테고리 데이터
   */
  const [category, setCategory] = useState<CategoryData | null>(null)
  const [cat1List, setCat1List] = useState<GlobalCode[]>([])

  /**
   * 정렬 데이터
   */
  const [selectedOrder, setSelectedOrder] = useState<string>('latest')

  /**
   * 브랜드 데이터
   */
  const [useBrand, setUseBrand] = useState<boolean>(false)
  const [brandList, setBrandList] = useState<FilterBrandItem[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string[]>([])

  /**
   * 등급 데이터
   */
  const [useGrade, setUseGrade] = useState<boolean>(false)
  const [gradeList, setGradeList] = useState<FilterGradeItem[]>([])
  const [selectedGrade, setSelectedGrade] = useState<string[]>([])

  /**
   * 계절 데이터
   */
  const [useSeason, setUseSeason] = useState<boolean>(false)
  const [seasonList, setSeasonList] = useState<FilterSeasonItem[]>([])
  const [selectedSeason, setSelectedSeason] = useState<string[]>([])

  /**
   * 유형 데이터
   */
  const [useType, setUseType] = useState<boolean>(false)
  const [typeList, setTypeList] = useState<FilterTypeItem[]>([])
  const [selectedType, setSelectedType] = useState<string[]>([])

  /**
   * 가격 데이터
   */
  const [usePrice, setUsePrice] = useState<boolean>(false)
  const [priceList, setPriceList] = useState<FilterPriceItem[]>([])
  const [selectedPrice, setSelectedPrice] = useState<string>('')

  /**
   * 사이즈 데이터
   */
  const [useSize, setUseSize] = useState<boolean>(false)
  const [sizeList1, setSizeList1] = useState<SizeCategory>({ name: '사이즈 1', list: [] })
  const [sizeList2, setSizeList2] = useState<SizeCategory>({ name: '사이즈 2', list: [] })
  const [sizeList3, setSizeList3] = useState<SizeCategory>({ name: '사이즈 3', list: [] })
  const [selectedSize, setSelectedSize] = useState<string[]>([])

  /**
   * 색상 데이터
   */
  const [useColor, setUseColor] = useState<boolean>(false)
  const [colorList, setColorList] = useState<FilterColorItem[]>([])
  const [selectedColor, setSelectedColor] = useState<string[]>([])

  /**
   * 골프 데이터
   */
  const [useGolf, setUseGolf] = useState<boolean>(false)
  const [golfList, setGolfList] = useState<FilterGolfItem[]>([])
  const [selectedGolf, setSelectedGolf] = useState<string>('')

  /**
   * 카테고리 데이터
   */
  const [cat1, setCat1] = useState('')
  const [cat2, setCat2] = useState('')
  const [cat3, setCat3] = useState('')

  /**
   * 정렬 데이터
   */
  const orderList = [
    {
      name: '최신순',
      code: 'latest',
    },
    {
      name: '할인율 높은순',
      code: 'highestSaleRatio',
    },
    {
      name: '할인율 낮은순',
      code: 'lowestSaleRatio',
    },
    {
      name: '높은 가격순',
      code: 'highestPrice',
    },
    {
      name: '낮은 가격순',
      code: 'lowestPrice',
    },
  ]

  /**
   * 필터 데이터 세팅
   * @param useGetFiltersQuery
   * @param activeBrand.filterUrlName
   * @returns 필터 데이터 세팅
   */
  const { data, isLoading, isError } = useGetFiltersQuery(activeBrand.filterUrlName)
  const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useGetCategoryQuery()

  /**
   * 필터 데이터 세팅
   * @param useEffect
   * @param data
   * @returns 필터 데이터 세팅
   */
  useEffect(() => {
    if (data) {
      setFilter(data)
      if (activeBrand.filterUrlName !== 'orm') {
        setCategory(data.cat)
      }
    }
  }, [data])

  /**
   * 카테고리 데이터 세팅
   * @param useEffect
   * @param categoryData
   * @returns 카테고리 데이터 세팅
   */
  useEffect(() => {
    if (categoryData && activeBrand.filterUrlName === 'orm') {
      setCategory(categoryData)
      setCat1List(categoryData.cat1.map((e) => ({ code: e.code, name: e.name })))
    }
  }, [categoryData])

  /**
   * 필터 데이터 세팅
   * @param useEffect
   * @param filter
   * @returns 필터 데이터 세팅
   */
  useEffect(() => {
    if (filter) {
      setBrandList(filter.brand?.list ?? [])
      setGradeList(filter.grade?.list ?? [])
      setSeasonList(filter.season?.list ?? [])
      setTypeList(filter.type?.list ?? [])
      setPriceList(filter.price?.list ?? [])
      setSizeList1(filter.size?.list[0] ?? { name: '사이즈 1', list: [] })
      setSizeList2(filter.size?.list[1] ?? { name: '사이즈 2', list: [] })
      setSizeList3(filter.size?.list[2] ?? { name: '사이즈 3', list: [] })
      setColorList(filter.color?.list ?? [])
      setGolfList(filter.golf?.list ?? [])

      if (activeBrand.filterUrlName !== 'orm') {
        setCat1List(filter.cat?.list?.map((e) => ({ code: e.code, name: e.name })) ?? [])
      }

      setUseBrand(filter.usedFilter.findIndex((e) => e.code === 'brand') > -1)
      setUseGrade(filter.usedFilter.findIndex((e) => e.code === 'grade') > -1)
      setUseSeason(filter.usedFilter.findIndex((e) => e.code === 'season') > -1)
      setUseType(filter.usedFilter.findIndex((e) => e.code === 'type') > -1)
      setUsePrice(filter.usedFilter.findIndex((e) => e.code === 'price') > -1)
      setUseSize(filter.usedFilter.findIndex((e) => e.code === 'size') > -1)
      setUseColor(filter.usedFilter.findIndex((e) => e.code === 'color') > -1)
      setUseGolf(filter.usedFilter.findIndex((e) => e.code === 'golf') > -1)
    }
  }, [filter])

  /**
   * 카테고리 2 리스트
   * @returns 카테고리 2 리스트
   */
  const cat2List = useMemo(() => {
    if (cat1) {
      if (cat1 === 'none') {
        return []
      }
      if (activeBrand.filterUrlName === 'orm') {
        const idx = category?.cat1?.findIndex((e) => e.code === cat1)
        if (idx === -1) {
          return []
        }
        return category?.cat1[idx].cat2 ?? []
      }
      const idx = data.cat.list?.findIndex((e) => e.code === cat1)
      if (idx === -1) {
        return []
      }
      return category?.list[idx].cat2List ?? []
    }
    return []
  }, [cat1])

  /**
   * 카테고리 3 리스트
   * @returns 카테고리 3 리스트
   */
  const cat3List = useMemo(() => {
    if (cat2) {
      if (cat2 === 'none') {
        return []
      }
      if (activeBrand.filterUrlName === 'orm') {
        const idx = category?.cat1?.findIndex((e) => e.code === cat1)
        if (idx === -1) {
          return []
        }
        const idx2 = category?.cat1[idx].cat2?.findIndex((e) => e.code === cat2)
        if (idx2 === -1) {
          return []
        }
        return category?.cat1[idx].cat2[idx2].cat3 ?? []
      }
      // 25.04 KOLON만 카테고리 depth3까지 사용
      const idx = data.cat.list?.findIndex((e) => e.code === cat2)
      if (idx === -1) {
        return []
      }
      const idx2 = category?.list[idx].cat2List?.findIndex((e) => e.code === cat2)
      if (idx2 === -1) {
        return []
      }
      return category?.list[idx].cat2List[idx2].cat3 ?? []
    }
    return []
  }, [cat2])

  /**
   * 완성된 이동경로
   * @returns 완성된 이동경로
   */
  const activeFilters = ComputeActiveFilter({
    selectedOrder,
    selectedBrand,
    selectedGrade,
    selectedSeason,
    selectedType,
    selectedPrice,
    selectedSize,
    selectedColor,
    selectedGolf,
    cat1,
    cat2,
    cat3,
  })

  /**
   * 로딩 처리
   * @returns 로딩 처리
   */
  if (isLoading || categoryLoading || isError || categoryError) return <Loading />

  /**
   * 필터 데이터 세팅 처리
   * @returns 필터 데이터 세팅 처리
   */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <ScrollArea className="h-[80vh]">
          <DialogHeader>
            <DialogTitle className="headline-b">이동경로-필터 조합</DialogTitle>
            <DialogDescription className="caption-b text-red-500">*필수항목 - 정렬, 카테고리</DialogDescription>
          </DialogHeader>
          <div className="my-4 divide-y divide-gray-300 rounded-lg border border-gray-200">
            <CommonFilterRadio
              title="정렬"
              items={orderList}
              selectedItem={selectedOrder}
              setValue={setSelectedOrder}
              className=""
            />
            <CommonFilterMultipleSelect
              title="카테고리"
              useDepth={activeBrand.filterUrlName === 'orm' ? 3 : 2}
              oneList={cat1List}
              selectedOne={cat1}
              setOneValue={(value) => {
                setCat1(value)
                setCat2('')
                setCat3('')
              }}
              setOnePlaceholder="카테고리 1"
              twoList={cat2List}
              selectedTwo={cat2}
              setTwoValue={(value) => {
                setCat2(value)
                setCat3('')
              }}
              setTwoPlaceholder="카테고리 2"
              threeList={cat3List}
              selectedThree={cat3}
              setThreeValue={(value) => {
                setCat3(value)
              }}
              setThreePlaceholder="카테고리 3"
              className=""
            />
            {useBrand && (
              <CommonFilterCheckbox
                title="브랜드"
                items={brandList}
                selectedItems={selectedBrand}
                setValue={setSelectedBrand}
                className=""
              />
            )}
            {useGrade && (
              <CommonFilterCheckbox
                title="등급"
                items={gradeList}
                selectedItems={selectedGrade}
                setValue={setSelectedGrade}
                className=""
              />
            )}
            {useSeason && (
              <CommonFilterCheckbox
                title="계절"
                items={seasonList}
                selectedItems={selectedSeason}
                setValue={setSelectedSeason}
                className=""
              />
            )}
            {useType && (
              <CommonFilterCheckbox
                title="유형"
                items={typeList}
                selectedItems={selectedType}
                setValue={setSelectedType}
                className=""
              />
            )}
            {useSize && (
              <div>
                <CommonFilterCheckbox
                  title={`사이즈 ${sizeList1.name}`}
                  items={sizeList1.list}
                  selectedItems={selectedSize}
                  setValue={setSelectedSize}
                  className=""
                />
                <CommonFilterCheckbox
                  title={`사이즈 ${sizeList2.name}`}
                  items={sizeList2.list}
                  selectedItems={selectedSize}
                  setValue={setSelectedSize}
                  className=""
                />
                <CommonFilterCheckbox
                  title={`사이즈 ${sizeList3.name}`}
                  items={sizeList3.list}
                  selectedItems={selectedSize}
                  setValue={setSelectedSize}
                  className=""
                />
              </div>
            )}
            {useColor && (
              <CommonFilterCheckbox
                title="색상"
                items={colorList}
                selectedItems={selectedColor}
                setValue={setSelectedColor}
                className=""
              />
            )}
            {useGolf && (
              <CommonFilterRadio
                title="골프"
                items={golfList}
                selectedItem={selectedGolf}
                setValue={setSelectedGolf}
                className=""
              />
            )}
            {usePrice && (
              <CommonFilterRadio
                title="가격"
                items={priceList}
                selectedItem={selectedPrice}
                setValue={setSelectedPrice}
                className=""
              />
            )}
          </div>
          <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200">
            <CommonListCellBig title="완성된 필터">
              <Button
                onClick={() => copyToClipboard(activeFilters.filter)}
                className="my-auto flex w-[700px] justify-between rounded-lg bg-gray-200 px-4 py-2 select-none"
              >
                <p className="subhead-2-b my-auto line-clamp-2 max-w-[640px] cursor-pointer text-gray-900">
                  {activeFilters.filter}
                </p>
                <CopyIcon className="my-auto text-gray-600" width={20} height={20} />
              </Button>
            </CommonListCellBig>

            <CommonListCellBig title="완성된 이동경로">
              <Button
                onClick={() => copyToClipboard(activeFilters.route)}
                className="my-auto flex w-[700px] justify-between rounded-lg bg-gray-200 px-4 py-2 select-none"
              >
                <p className="subhead-2-b my-auto line-clamp-2 max-w-[640px] cursor-pointer text-gray-900">
                  {activeFilters.route}
                </p>
                <CopyIcon className="my-auto text-gray-600" width={20} height={20} />
              </Button>
            </CommonListCellBig>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} size="xxlarge" fill="black" rounded="full" width="md">
              닫기
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
