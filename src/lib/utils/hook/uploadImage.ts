/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs'
import { toast } from 'sonner'

import { ComponentTypeItemType } from '@/lib/types/component'

/**
 * 이미지 업로드
 * @param image 이미지 파일
 * @param componentTypeItem 컴포넌트 타입 아이템
 * @param imageTrigger 이미지 업로드 트리거
 * @returns 이미지 업로드 성공 여부
 */
export const uploadImage = async (
  image: File,
  componentTypeItem: ComponentTypeItemType,
  imageTrigger: any,
  setLoading: (loading: boolean) => void,
) => {
  /**
   * 이미지 업로드
   */
  const imgName = dayjs().format('yyyyMMddHHmmssSSS')
  const formData = new FormData()

  /**
   * 이미지 업로드 폼 데이터 생성
   */
  if (image.name.endsWith('.lottie')) {
    formData.append('imageFile', image, `${imgName}_${componentTypeItem?.code}.lottie`)
  } else {
    formData.append('imageFile', image, `${imgName}_${componentTypeItem?.code}_image.png`)
  }
  formData.append('typeCode', componentTypeItem?.code)

  /**
   * 이미지 업로드
   */
  const imageRes = await imageTrigger(formData)

  /**
   * 이미지 업로드 결과 확인
   */
  if (imageRes.data.code === 'R000') {
    setLoading(false)
    toast.success('이미지 업로드 완료')

    /**
     * 이미지 업로드 성공 시 이미지 경로 반환
     */
    return {
      success: true,
      data: imageRes.data.data,
    }
  }
  setLoading(false)
  toast.error(imageRes.data.info)

  /**
   * 이미지 업로드 실패 시 실패 메시지 반환
   */
  return {
    success: false,
    data: imageRes.data.data,
  }
}
