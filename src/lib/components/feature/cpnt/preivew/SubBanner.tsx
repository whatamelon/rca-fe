'use client'

import { PreviewImage } from '@/lib/components/global/image/PreviewImage'
import ReadyPreview from '@/lib/components/feature/cpnt/preivew/ReadyPreivew'
import { Button } from '@/lib/components/element/button/Button'
import { ContentCreateRequest } from '@/lib/types/contents'

export default function PreviewSubBanner({ title, titleColor, body, bodyColor, imgLink }: ContentCreateRequest) {
  if (!imgLink || !title || !body || !titleColor || !bodyColor) {
    return <ReadyPreview />
  }
  return (
    <div className="max-w-[375px]">
      <div className="relative">
        <PreviewImage src={imgLink} alt={title} width={375} height={375} className="object-cover" priority />
        <div className="absolute !bottom-[36px] left-1/2 w-[calc(100%-40px)] -translate-x-1/2">
          <div className="flex w-full justify-between">
            <div className="w-[calc(100%-100px)]">
              <h2
                className="headline-b line-clamp-2 w-full text-left whitespace-pre-line"
                style={{ color: `#${titleColor}` }}
              >
                {title}
              </h2>
              <h3
                className="body-1-r mt-1 line-clamp-2 w-full text-left whitespace-pre-line"
                style={{ color: `#${bodyColor}` }}
              >
                {body}
              </h3>
            </div>
            <div className="flex flex-col justify-end">
              <Button type="button" line="white" rounded="full" size="small">
                전체보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
