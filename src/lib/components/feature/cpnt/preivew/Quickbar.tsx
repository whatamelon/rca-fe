'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Image from 'next/image'

import ReadyPreview from '@/lib/components/feature/cpnt/preivew/ReadyPreivew'
import { ContentCreateRequest } from '@/lib/types/contents'

export default function PreviewQuickbar({ title, imgLink }: ContentCreateRequest) {
  if (!imgLink || !title) {
    return <ReadyPreview />
  }

  return (
    <div className="flex h-full w-full max-w-[375px] items-center justify-center rounded-sm border bg-white">
      <div className="flex flex-col items-center justify-center">
        {imgLink.endsWith('.lottie') ? (
          <DotLottieReact style={{ height: '64px', width: '64px' }} autoplay loop src={imgLink} />
        ) : (
          <Image src={imgLink} width={64} height={64} alt={`${title} 퀵바`} />
        )}
        <p className="text-label-2-r text-center whitespace-pre text-gray-900">{title}</p>
      </div>
    </div>
  )
}
