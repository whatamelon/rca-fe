'use client'

import { memo } from 'react'

import { OptimizedImage } from './OptimizedImage'

interface ThumbnailImageProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export const ThumbnailImage = memo(({ src, alt, size = 60, className = '' }: ThumbnailImageProps) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`rounded-sm object-cover ${className}`}
    quality={60}
    sizes={`${size}px`}
  />
))
