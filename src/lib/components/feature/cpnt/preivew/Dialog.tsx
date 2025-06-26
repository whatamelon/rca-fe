'use client'

import { PreviewImage } from '@/lib/components/global/image/PreviewImage'
import ReadyPreview from '@/lib/components/feature/cpnt/preivew/ReadyPreivew'
import { Button } from '@/lib/components/element/button/Button'
import { ContentCreateRequest } from '@/lib/types/contents'

export default function PreviewDialog({ imgLink, title }: ContentCreateRequest) {
  if (!imgLink) {
    return <ReadyPreview />
  }

  return (
    <div className="rounded-t-3xl !border-t-0">
      <div className="aspect-h-3 aspect-w-4 block h-[300px] w-full overflow-hidden rounded-t-3xl">
        <PreviewImage
          src={imgLink}
          alt={title || '다이얼로그 이미지'}
          width={400}
          height={300}
          priority
          className="rounded-t-3xl"
        />
      </div>
      <div className="z-1 flex w-full justify-between bg-white px-5 py-4">
        <Button className="subhead-3-b text-gray-600">오늘 보지 않기</Button>
        <Button className="subhead-3-b text-black">닫기</Button>
      </div>
    </div>
  )
}
