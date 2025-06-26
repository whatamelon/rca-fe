'use client'

import { ListCellProps } from '@/lib/types/component'

import CommonFilterTitleBox from '../filter/title/FilterTitleBox'

export default function CommonListCell({ title, children, body }: ListCellProps) {
  return (
    <div>
      <div className="flex h-full min-h-10 w-full">
        {title && <CommonFilterTitleBox title={title} />}

        <div className="flex h-auto w-[calc(100%-120px)] px-2">
          <div className="flex w-full items-center py-2.5">
            {children || <p className="body-1-r my-auto text-gray-900">{body}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
