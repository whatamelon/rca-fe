import { toast } from 'sonner'

import { ComponentTypeItemType } from '@/lib/types/component'
import { ContentCreateRequest, ContentUpdateRequest } from '@/lib/types/contents'

/**
 * 컴포넌트 타입 유효성 검사
 * @param componentTypeItem 컴포넌트 타입 아이템
 * @param prodIds 판매상품 ID
 * @param image 이미지
 * @param previewImg 미리보기 이미지
 * @param title 제목
 * @param body 내용
 * @param titleColor 제목 색상
 * @param bodyColor 내용 색상
 * @param button 버튼
 * @param buttonColor 버튼 색상
 * @param buttonBgColor 버튼 배경 색상
 * @param bgColor 배경 색상
 * @param actType 이동경로
 * @param actData 이동경로 데이터
 * @param contentId 컨텐츠 ID
 * @param useFlag 앱노출 여부
 * @param typeCode 컴포넌트 타입 코드
 * @param validateType 유효성 검사 타입 = create | update
 * @returns 유효성 검사 결과
 * @returns success: true | false
 * @returns result: ContentCreateRequest | ContentUpdateRequest
 */
export const validateContent = (
  setLoading: (loading: boolean) => void,
  componentTypeItem: ComponentTypeItemType,
  prodIds: string,
  image: File,
  previewImg: string | File,
  title: string,
  body: string,
  titleColor: string,
  bodyColor: string,
  button: string,
  buttonColor: string,
  buttonBgColor: string,
  bgColor: string,
  actType: string,
  actData: string,
  contentId?: string,
  useFlag?: boolean,
  typeCode?: string,
  validateType?: 'create' | 'update',
) => {
  const createParameters: ContentCreateRequest = { typeCode: typeCode ?? '' }
  const updateParameters: ContentUpdateRequest = {
    contentId: contentId ?? '',
    useFlag: useFlag ?? false,
  }

  if (!componentTypeItem) {
    toast.error('컴포넌트 타입을 선택해주세요.')
    setLoading(false)
    return {
      success: false,
      result: null,
    }
  }
  if (componentTypeItem.usedTags.includes('prodIds')) {
    if (!prodIds) {
      toast.error('판매상품 ID를 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.prodIds = prodIds
    } else {
      updateParameters.prodIds = prodIds
    }
  }
  if (componentTypeItem.usedTags.includes('imgLink')) {
    if (!image && !previewImg) {
      toast.error('이미지를 업로드해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
  }
  if (componentTypeItem.usedTags.includes('title')) {
    if (!title) {
      toast.error('제목을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.title = title
    } else {
      updateParameters.title = title
    }
  }
  if (componentTypeItem.usedTags.includes('body')) {
    if (!body) {
      toast.error('내용을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.body = body
    } else {
      updateParameters.body = body
    }
  }
  if (componentTypeItem.usedTags.includes('titleColor')) {
    if (!titleColor) {
      toast.error('제목 색상을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.titleColor = titleColor
    } else {
      updateParameters.titleColor = titleColor
    }
  }
  if (componentTypeItem.usedTags.includes('bodyColor')) {
    if (!bodyColor) {
      toast.error('내용 색상을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.bodyColor = bodyColor
    } else {
      updateParameters.bodyColor = bodyColor
    }
  }
  if (componentTypeItem.usedTags.includes('button')) {
    if (!button) {
      toast.error('버튼을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.button = button
    } else {
      updateParameters.button = button
    }
  }
  if (componentTypeItem.usedTags.includes('buttonColor')) {
    if (!buttonColor) {
      toast.error('버튼 색상을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.buttonColor = buttonColor
    } else {
      updateParameters.buttonColor = buttonColor
    }
  }
  if (componentTypeItem.usedTags.includes('buttonBgColor')) {
    if (!buttonBgColor) {
      toast.error('버튼 배경 색상을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.buttonBgColor = buttonBgColor
    } else {
      updateParameters.buttonBgColor = buttonBgColor
    }
  }
  if (componentTypeItem.usedTags.includes('bgColor')) {
    if (!bgColor) {
      toast.error('배경 색상을 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.bgColor = bgColor
    } else {
      updateParameters.bgColor = bgColor
    }
  }
  if (componentTypeItem.usedTags.includes('actType')) {
    if (!actType) {
      toast.error('이동경로를 선택해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (actType !== 'none' && !actData) {
      toast.error('이동경로를 입력해주세요.')
      setLoading(false)
      return {
        success: false,
        result: null,
      }
    }
    if (validateType === 'create') {
      createParameters.actType = actType
    } else {
      updateParameters.actType = actType
    }
    if (validateType === 'create') {
      createParameters.actData = actData
    } else {
      updateParameters.actData = actData
    }
  }

  /**
   * 유효성 검사 결과 반환
   */
  if (validateType === 'create') {
    return {
      success: true,
      result: createParameters,
    }
  }
  return {
    success: true,
    result: updateParameters,
  }
}
