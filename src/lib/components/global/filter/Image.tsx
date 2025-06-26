'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { FilterImageProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterImage({
  title,
  prevImgURL,
  setValue,
  className,
  accept = 'image/*',
}: FilterImageProps) {
  const [previewImg, setPreivewImg] = useState<string | null>(null)

  useEffect(() => {
    setPreivewImg(prevImgURL)
  }, [prevImgURL])

  /**
   * 이미지를 업로드하는 함수
   */
  const onUploadImg = (e) => {
    const inputFile = e.target as HTMLInputElement
    if (inputFile.files) {
      const tempFile = inputFile.files[0]
      if (tempFile) {
        setPreivewImg(URL.createObjectURL(tempFile))
      }
      setValue(tempFile)
    }
  }

  return (
    <div className={cn('flex h-full w-full', className)}>
      {title && <CommonFilterTitleBox title={title} />}

      <div className="flex w-[calc(100%-120px)] gap-x-4 gap-y-2 px-4 py-1">
        {prevImgURL && <Image width={160} height={160} src={prevImgURL} alt="이미지 필터" />}
        <label htmlFor="get_image" className="my-auto">
          <div className="subhead-2-b inline-flex h-8 cursor-pointer items-center justify-center gap-0.5 rounded-[8px] border border-gray-100 px-4 whitespace-nowrap text-black">
            {previewImg && <span className="">이미지 수정</span>}
            {!previewImg && <span className="">이미지 등록</span>}
          </div>
        </label>
        <input id="get_image" type="file" style={{ display: 'none' }} accept={accept} onChange={onUploadImg} />
      </div>
    </div>
  )
}
