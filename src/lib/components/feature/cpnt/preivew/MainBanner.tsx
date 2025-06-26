'use client'

import { PreviewImage } from '@/lib/components/global/image/PreviewImage'
import ReadyPreview from '@/lib/components/feature/cpnt/preivew/ReadyPreivew'
import { ContentCreateRequest } from '@/lib/types/contents'

export default function PreviewMainBanner({ title, titleColor, body, bodyColor, imgLink }: ContentCreateRequest) {
  if (!imgLink || !title || !body || !titleColor || !bodyColor) {
    return <ReadyPreview />
  }
  return (
    <div className="max-w-[375px]">
      <div className="aspect-h-1 aspect-w-1 relative w-full bg-cover bg-center">
        <PreviewImage src={imgLink} alt={title} width={375} height={375} className="object-cover" priority />
        <div>
          <div className="absolute bottom-10 left-1/2 w-[calc(100%-40px)] -translate-x-1/2 text-left">
            <h2
              className="display-1-b line-clamp-2 w-full whitespace-pre"
              style={{ color: `#${titleColor.slice(0, 6)}` }}
            >
              {title}
            </h2>
            <h3
              className="body-2-r mt-2 line-clamp-2 w-full whitespace-pre"
              style={{ color: `#${bodyColor.slice(0, 6)}` }}
            >
              {body}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
