/**
 * ==============================================================================
 * @fileoverview ComputeActiveFilter
 * @description ComputeActiveFilter 컴포넌트를 정의합니다.
 * ComputeActiveFilter 컴포넌트는 현재 활성화된 필터 데이터를 조합하여 이동경로와 필터를 표시합니다.
 * 
 * @returns {object} 필터 데이터와 이동경로를 반환합니다.
 * @returns {string} filter - 필터 데이터 - 커머스에서 분해해서 사용하는 값.
 * @returns {string} route - 이동경로 - 커머스에서 그대로 사용하는 값.
 * 
 * @param {string} selectedOrder - 정렬 필터
 * @param {string} cat1 - 카테고리1 필터
 * @param {string} cat2 - 카테고리2 필터
 * @param {string} cat3 - 카테고리3 필터
 * @param {string} selectedBrand - 브랜드 필터
 * @param {string} selectedGrade - 등급 필터
 * @param {string} selectedSeason - 계절 필터
 * @param {string} selectedType - 유형 필터
 * @param {string} selectedPrice - 가격 필터
 * @param {string} selectedSize - 사이즈 필터
 * @param {string} selectedColor - 색상 필터
 * @param {string} selectedGolf - 골프 필터
 *
 * @example
 * const { filter, route } = ComputeActiveFilter({
 *   selectedOrder: 'new',
 *   cat1: '1',
 *   cat2: '2',
 *   cat3: '3',
 *   selectedBrand: ['1', '2'],
 *   selectedGrade: ['1', '2'],
 *   selectedSeason: ['1', '2'],
 *   selectedType: ['1', '2'],
 *   selectedPrice: '100000',
 *   selectedSize: ['1', '2'],
 *   selectedColor: ['1', '2'],
 *   selectedGolf: '1',
 * })
 * 
 * console.log(filter, route)
 * // filter: "order=new::cat=123::brand=1,2::grade=1,2::season=1,2::type=1,2::price=100000::size=1,2::color=1,2::golf=1"
 * // route: "/product_list/v2?order=new&cat=123&brand=1,2&grade=1,2&season=1,2&type=1,2&price=100000&size=1,2&color=1,2&golf=1"
 * 
 * @module utils/hook/useComputeActiveFilter
 * ==============================================================================
 */

import { useMemo } from 'react'

const ComputeActiveFilter = ({
  selectedOrder,
  cat1,
  cat2,
  cat3,
  selectedBrand,
  selectedGrade,
  selectedSeason,
  selectedType,
  selectedPrice,
  selectedSize,
  selectedColor,
  selectedGolf,
}) =>
  useMemo(() => {
    let combi = ''

    if (selectedOrder !== null) {
      combi = `${combi}order=${selectedOrder}::`
    }

    if (cat1 !== 'none' && cat2 !== 'none' && cat3 !== 'none') {
      combi = `${combi}cat=${cat1}${cat2}${cat3}::`
    }

    const processArrayFilter = (selectedArray) => {
      if (selectedArray.length > 0) {
        const allIdx = selectedArray.findIndex((e) => e === 'all')
        if (allIdx > -1) {
          return selectedArray.join(',').replace('all,', '').replace('all', '')
        }
        return selectedArray.join(',')
      }
      return ''
    }

    if (selectedBrand.length > 0) {
      const newBrandArr = processArrayFilter(selectedBrand)
      combi = `${combi}brand=${newBrandArr}::`
    }

    if (selectedGrade.length > 0) {
      const newGradeArr = processArrayFilter(selectedGrade)
      combi = `${combi}grade=${newGradeArr}::`
    }

    if (selectedSeason.length > 0) {
      const newSeasonArr = processArrayFilter(selectedSeason)
      combi = `${combi}season=${newSeasonArr}::`
    }

    if (selectedType.length > 0) {
      const newTypeArr = processArrayFilter(selectedType)
      combi = `${combi}type=${newTypeArr}::`
    }

    if (selectedPrice !== null) {
      combi = `${combi}price=${selectedPrice}::`
    }

    if (selectedSize.length > 0) {
      const newSizeArr = processArrayFilter(selectedSize)
      combi = `${combi}size=${newSizeArr}::`
    }

    if (selectedColor.length > 0) {
      const newColorArr = processArrayFilter(selectedColor)
      combi = `${combi}color=${newColorArr}::`
    }

    if (selectedGolf !== null) {
      combi = `${combi}golf=${selectedGolf}::`
    }

    const res = combi.endsWith('::')
      ? combi.substring(0, combi.length - 2).replace('=,', '=')
      : combi.replace('=,', '=')

    return {
      filter: res,
      route: `/product_list?${res.replace(/::/g, '&')}`,
    }
  }, [
    selectedOrder,
    cat1,
    cat2,
    cat3,
    selectedBrand,
    selectedGrade,
    selectedSeason,
    selectedType,
    selectedPrice,
    selectedSize,
    selectedColor,
    selectedGolf,
  ])

export default ComputeActiveFilter
