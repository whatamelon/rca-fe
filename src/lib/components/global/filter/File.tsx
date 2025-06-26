'use client'

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'

import { FilterFileProps } from '@/lib/types/component'

import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterFile({
  title,
  prevFileURL,
  body,
  retryBody,
  validFunction,
  setValue,
}: FilterFileProps) {
  const [previewFile, setPreiewFile] = useState<string | null>(null)
  const [previewFileName, setPreiewFileName] = useState<string>('')

  useEffect(() => {
    setPreiewFile(prevFileURL)
  }, [prevFileURL])

  /**
   * 이미지를 업로드하는 함수
   */
  const onUploadFile = (e) => {
    const inputFile = e.target as HTMLInputElement

    if (inputFile.files) {
      const tempFile = inputFile.files[0]

      if (tempFile) {
        const res = validFunction(tempFile)
        if (res === true) {
          setPreiewFile(URL.createObjectURL(tempFile))
          setPreiewFileName(tempFile.name)
          setValue(tempFile)
        }
      }
    }
  }

  return (
    <div>
      <div className="flex h-full w-full">
        {title && <CommonFilterTitleBox title={title} />}
        <div className="flex w-[calc(100%-120px)] gap-x-4 gap-y-2 px-4 py-1">
          {previewFileName && <span className="caption-b my-auto text-black">{previewFileName}</span>}
          <label htmlFor="get_file" className="my-auto">
            <div className="subhead-2-b inline-flex h-8 cursor-pointer items-center justify-center gap-0.5 rounded-[8px] border border-gray-100 px-4 whitespace-nowrap text-black">
              <span className="">파일 {previewFile == null ? body : retryBody}</span>
            </div>
          </label>
          <input id="get_file" type="file" style={{ display: 'none' }} accept=".csv" onChange={onUploadFile} />
        </div>
      </div>
    </div>
  )
}
