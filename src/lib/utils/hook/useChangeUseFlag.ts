import { toast } from 'sonner'

import { useUpdateComponentMutation } from '@/lib/stores/service/componentSlice'
import { useUpdateContentMutation } from '@/lib/stores/service/contentSlice'
import { CommonResponse } from '@/lib/types/global'

export const useChangeUseFlag = ({
  useFlagType,
  successWord = '연결컨텐츠 선택 가능 여부',
}: {
  useFlagType: string
  successWord?: string
}) => {
  if (useFlagType === 'content') {
    const [useFlagTrigger, { isLoading: isUseFlagLoading }] = useUpdateContentMutation()
    const handleChangeUseFlag = async (contentId: number, useFlag: boolean) => {
      if (isUseFlagLoading) return

      const result = await useFlagTrigger({
        contentId,
        useFlag,
      })

      if (result.data) {
        if (result.data.code === 'R000') {
          toast.success(`${successWord}가 변경되었습니다.`)
        } else {
          toast.error(result.data.info)
        }
      }

      if (result.error || !result.data) {
        if ('data' in result.error) {
          const errorData = result.error.data as CommonResponse<null>
          toast.error(errorData.info)
        }
      }
    }

    return { handleChangeUseFlag, isUseFlagLoading }
  }
  const [useComponentFlagTrigger, { isLoading: isUseComponentFlagLoading }] = useUpdateComponentMutation()

  const handleChangeComponentUseFlag = async (componentId: number, useFlag: boolean, contentIds: string) => {
    if (isUseComponentFlagLoading) return

    const result = await useComponentFlagTrigger({
      componentId,
      useFlag,
      contentIds,
    })

    if (result.data) {
      if (result.data.code === 'R000') {
        toast.success(`${successWord}가 변경되었습니다.`)
      } else {
        toast.error(result.data.info)
      }
    }

    if (result.error || !result.data) {
      if ('data' in result.error) {
        const errorData = result.error.data as CommonResponse<null>
        toast.error(errorData.info)
      }
    }
  }

  return { handleChangeComponentUseFlag, isUseComponentFlagLoading }
}
