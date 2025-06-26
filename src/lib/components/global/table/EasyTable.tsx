/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import { formatHcActType } from '@/lib/utils/format/others/formatHc'

import { Button } from '@/lib/components/element/button/Button'
import DynamicIcon from '@/lib/components/element/DynamicIcon'
import { TableCell, TableRow } from '@/lib/components/element/Table'
import { Checkbox } from '../form/Checkbox'
import { ThumbnailImage } from '../image/ThumbnailImage'

function EasyRow({ row, selectedIds, checking }: { row: any; selectedIds: string[]; checking: (id: string) => void }) {
  return (
    <tr
      key={`${row.contentId}row`}
      onClick={() => checking(row.contentId.toString())}
      className={`subhead-2-b cursor-pointer transition-colors ${
        selectedIds.includes(row.contentId.toString()) ? 'bg-blue-100' : 'hover:bg-gray-100'
      }`}
    >
      <td className="border border-gray-200 p-2">
        <Checkbox
          checked={selectedIds.includes(row.contentId.toString())}
          onChange={() => checking(row.contentId.toString())}
        />
      </td>
      <td className="border border-gray-200 p-2">{row.contentId}</td>
      <td className="border border-gray-200 p-2">{row.title ?? '-'}</td>
      <td className="border border-gray-200 p-2">
        {row.imgLink ? (
          row.imgLink?.endsWith('.lottie') ? (
            <DotLottieReact style={{ height: '64px', width: '64px' }} autoplay loop src={row.imgLink} />
          ) : (
            <ThumbnailImage src={row.imgLink} alt="이미지" size={60} />
          )
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 bg-gray-200">
            <DynamicIcon name="image" className="m-auto flex h-4 w-4 justify-center-safe text-center" />
          </div>
        )}
      </td>
      <td className="border border-gray-200 p-2">
        <div>{formatHcActType(row.actType) ?? '-'}</div>
      </td>
      <td className="border border-gray-200 p-2">{row.actData ?? '-'}</td>
    </tr>
  )
}

export default function EasyTable({
  data,
  selectedIds,
  setSelectedIds,
}: {
  data: any[]
  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void
}) {
  const checking = (id: string) => {
    if (id === '') {
      setSelectedIds([])
    } else if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  return (
    <div className="max-h-[500px] w-full overflow-y-auto rounded-md border border-gray-200 bg-white">
      <table className="w-full border-collapse border-hidden">
        <thead className="subhead-2-b sticky top-0 rounded-md border-gray-200 bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-2">
              <Button size="small" onClick={() => checking('')}>
                <DynamicIcon name="rotate-ccw" className="mx-auto flex h-4 w-4 justify-center-safe text-center" />
              </Button>
            </th>
            <th className="border border-gray-200 p-2">컨텐츠 ID</th>
            <th className="border border-gray-200 p-2">컨텐츠 제목</th>
            <th className="border border-gray-200 p-2">컨텐츠 이미지</th>
            <th className="border border-gray-200 p-2">이동 타입</th>
            <th className="border border-gray-200 p-2">이동 데이터</th>
          </tr>
        </thead>
        <tbody className="rounded-md border-gray-200">
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <span className="subhead-2-b text-gray-500">결과가 없습니다.</span>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => <EasyRow row={row} selectedIds={selectedIds} checking={checking} {...row} />)
          )}
        </tbody>
      </table>
    </div>
  )
}
