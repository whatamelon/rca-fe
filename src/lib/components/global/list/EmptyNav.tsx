'use client'

import { EmptyNavProps } from '@/lib/types/component'
import { formatWonNoBlank } from '@/lib/utils/format/number/formatWonNoBlank'

export default function CommonEmptyNav({ title, totalCnt, isBetween, children }: EmptyNavProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-5">
      <div className={`${isBetween === true && `justify-between`} flex space-x-4 py-3`}>
        <div className="my-auto h-full">
          {title && <p className="subhead-3-b my-auto text-black">{title}</p>}
          {totalCnt && (
            <p className="subhead-3-b my-auto text-black">
              총 <span className="text-blue-500">{formatWonNoBlank(totalCnt)}</span>건
            </p>
          )}
        </div>
        {children && children}
      </div>
    </div>
  )
}
