'use client'

import { ListCellBigProps } from '@/lib/types/component'

import CommonFilterTitleBox from '../filter/title/FilterTitleBox'

export default function CommonListCellBig({ title, children, body }: ListCellBigProps) {
  return (
    <div>
      <div className="flex h-full min-h-10 w-full">
        {title && <CommonFilterTitleBox title={title} />}

        <div className="my-auto flex h-full w-[calc(100%-120px)] px-2">
          <div className="my-auto h-fit">{children || <p className="body-1-r text-gray-900">{body}</p>}</div>
        </div>
      </div>
    </div>
  )
}
