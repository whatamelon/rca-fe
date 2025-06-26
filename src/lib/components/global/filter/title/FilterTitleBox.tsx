'use client'

export default function CommonFilterTitleBox({ title }: { title: string }) {
  return (
    <div className="flex h-auto w-[120px] shrink-0 items-center justify-end bg-gray-100 px-2 py-3 text-right">
      <span className="subhead-2-b text-right break-keep text-gray-600">{title}</span>
    </div>
  )
}
