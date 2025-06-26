/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */

'use client'

import { arrayMove } from '@dnd-kit/sortable'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import HeaderLayout from '@/lib/components/global/Headers'
import CommonEmptyNav from '@/lib/components/global/list/EmptyNav'
import Loading from '@/lib/components/global/Loading'
import { useLoadingScreen } from '@/lib/components/global/LoadingProvider'
import ListHome from '@/lib/components/feature/pg/Home'
import { Button } from '@/lib/components/element/button/Button'
import {
  useDeleteComponentMutation,
  useGetComponentListQuery,
  useUpdateComponentOrderMutation,
} from '@/lib/stores/service/componentSlice'
import { CommonResponse } from '@/lib/types/global'
import { useChangeUseFlag } from '@/lib/utils/hook/useChangeUseFlag'

export default function PgHomePage() {
  const router = useRouter()
  const { data, isLoading } = useGetComponentListQuery('home')
  const [deleteTrigger, { isLoading: isDeleteLoading }] = useDeleteComponentMutation()
  const [changeOrderIdxTrigger, { isLoading: isChangeOrderIdxLoading }] = useUpdateComponentOrderMutation()

  const { handleChangeComponentUseFlag } = useChangeUseFlag({ useFlagType: 'component' })
  const { setLoading } = useLoadingScreen()

  const handleDelete = async (componentId: number) => {
    const confirms = confirm('삭제하시겠습니까?')
    if (!confirms) return
    if (isDeleteLoading || isChangeOrderIdxLoading || isLoading) return
    if (confirm) {
      setLoading(true)
      const res = await deleteTrigger(componentId.toString())
      if (res.data) {
        if (res.data.code === 'R000') {
          setLoading(false)
          toast.success('컴포넌트 삭제 완료')
        } else {
          setLoading(false)
          toast.error(res.data.info)
        }
      }

      if (res.error || !res.data) {
        setLoading(false)
        if ('data' in res.error) {
          const errorData = res.error.data as CommonResponse<null>
          alert(errorData.info)
        }
      }
    }
  }

  const changeOrderIdx = async (event: any) => {
    if (isChangeOrderIdxLoading || isDeleteLoading || isLoading) return
    const { active, over } = event

    if (active.id !== over.id) {
      const componentIds = arrayMove(data.data, active.id, over.id)
        .map((item) => item.componentId)
        .join(',')

      const res = await changeOrderIdxTrigger({ componentIds, pageCode: 'home' })
      if (res.data) {
        if (res.data.code === 'R000') {
          toast.success('컴포넌트 순서 변경 완료')
        } else {
          toast.error(res.data.info)
        }
      }

      if (res.error || !res.data) {
        if ('data' in res.error) {
          const errorData = res.error.data as CommonResponse<null>
          alert(errorData.info)
        }
      }
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-2">
      <HeaderLayout title="페이지 > 홈" back={false} />
      <CommonEmptyNav totalCnt={data?.data.length} isBetween>
        <Button onClick={() => router.push(`/cpnt/new`)} size="medium" fill="blue" rounded="lg">
          컴포넌트 추가
        </Button>
      </CommonEmptyNav>
      {data && (
        <ListHome
          list={data.data}
          handleUseFlag={handleChangeComponentUseFlag}
          handleDelete={handleDelete}
          changeOrderIdx={changeOrderIdx}
        />
      )}
    </div>
  )
}
