'use client'

import { memo } from 'react'

import { OptimizedImage } from './OptimizedImage'

interface PreviewImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export const PreviewImage = memo(({ src, alt, width, height, className = '', priority = false }: PreviewImageProps) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-cover ${className}`}
    priority={priority}
    quality={85}
    sizes={`(max-width: 768px) 100vw, ${width}px`}
  />
))
