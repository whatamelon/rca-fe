'use client'

import Image from 'next/image'

import ReadyPreview from '@/lib/components/feature/cpnt/preivew/ReadyPreivew'
import { Button } from '@/lib/components/element/button/Button'
import { ContentCreateRequest } from '@/lib/types/contents'

export default function PreviewRelaySwiper({
  title,
  titleColor,
  body,
  bodyColor,
  button,
  buttonColor,
  buttonBgColor,
  bgColor,
  imgLink,
}: ContentCreateRequest) {
  if (
    !imgLink ||
    !title ||
    !body ||
    !titleColor ||
    !bodyColor ||
    !button ||
    !buttonColor ||
    !buttonBgColor ||
    !bgColor
  ) {
    return <ReadyPreview />
  }

  return (
    <div className="max-w-[375px]">
      <div
        className="flex h-[460px] flex-col justify-between rounded-3xl px-8 py-10"
        style={{ backgroundColor: `#${bgColor}` }}
      >
        <div>
          <Image src={imgLink} width={256} height={120} className="object-contain" alt={title} />
          <h2 className="text-display-2-b mt-8 line-clamp-2 whitespace-pre" style={{ color: `#${titleColor}` }}>
            {title}
          </h2>
          <h3 className="text-body-2-r mt-2 line-clamp-3 whitespace-pre" style={{ color: `#${bodyColor}` }}>
            {body}
          </h3>
        </div>
        <Button
          size="xxlarge"
          width="full"
          rounded="full"
          fill="black"
          style={{ color: `#${buttonColor}`, backgroundColor: `#${buttonBgColor}`, height: '60px' }}
        >
          {button}
        </Button>
      </div>
    </div>
  )
}
