'use client'

import Image from 'next/image'
import { memo } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // CDN URL이 있다면 여기서 처리
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src
  }

  // 이미지 URL에 width와 quality 파라미터 추가
  const url = new URL(src, window.location.origin)
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality || 75).toString())
  return url.toString()
}

export const OptimizedImage = memo(
  ({ src, alt, width, height, className = '', priority = false, quality = 75, sizes }: OptimizedImageProps) => {
    if (!src) return null

    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        loader={imageLoader}
        style={{ objectFit: 'cover' }}
      />
    )
  },
)
