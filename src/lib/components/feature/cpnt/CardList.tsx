/* eslint-disable react/no-unstable-nested-components */

'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { memo } from 'react'

import { ContentListResponse } from '@/lib/types/contents'
import { PageableType } from '@/lib/types/global'
import { formatDateFullForUTC } from '@/lib/utils/format/date'
import { formatHcActType } from '@/lib/utils/format/others/formatHc'

import { ThumbnailImage } from '@/lib/components/global/image/ThumbnailImage'
import CommonLinkId from '@/lib/components/global/link/Id'
import { DataTable } from '@/lib/components/global/table/DataTable'
import DynamicIcon from '@/lib/components/element/DynamicIcon'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/components/element/Popover'
import { Switch } from '@/lib/components/element/Switch'

function ListCardList({
  list,
  usePagination = false,
  pagination,
  setPagination,
  pageable,
  handleUseFlag,
}: {
  list: ContentListResponse[]
  usePagination?: boolean
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  pageable: PageableType
  handleUseFlag: (contentId: number, useFlag: boolean) => void
}) {
  const columns: ColumnDef<ContentListResponse>[] = [
    {
      accessorKey: 'contentId',
      header: '컨텐츠 ID',
      cell: (row) => <CommonLinkId id={row.row.original.contentId.toString()} route="content" typeCode="CL" />,
    },
    {
      accessorKey: 'imgLink',
      header: '이미지',
      cell: (row) => (
        <Popover>
          <PopoverTrigger>
            {row.row.original.imgLink ? (
              <ThumbnailImage src={row.row.original.imgLink} alt="이미지" size={60} />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 bg-gray-200">
                <DynamicIcon name="image" className="m-auto flex h-4 w-4 justify-center-safe text-center" />
              </div>
            )}
          </PopoverTrigger>
          <PopoverContent>
            <Image src={row.row.original.imgLink} alt="이미지" width={600} height={600} />
          </PopoverContent>
        </Popover>
      ),
    },
    {
      accessorKey: 'title',
      header: '제목',
      cell: (row) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.row.original.title ?? '-'}</div>
      ),
      size: 200,
    },
    {
      accessorKey: 'body',
      header: '내용',
      cell: (row) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.row.original.body ?? '-'}</div>
      ),
      size: 200,
    },
    {
      accessorKey: 'actType',
      header: '이동 타입',
      cell: (row) => <div>{formatHcActType(row.row.original.actType) ?? '-'}</div>,
    },
    {
      accessorKey: 'actData',
      header: '이동 데이터',
      cell: (row) => <div>{row.row.original.actData.length > 0 ? row.row.original.actData : '-'}</div>,
    },
    {
      accessorKey: 'useFlag',
      header: '앱노출 여부',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={row.row.original.useFlag}
            onCheckedChange={() => handleUseFlag(row.row.original.contentId, !row.row.original.useFlag)}
            className="data-[state=checked]:!bg-blue-600 data-[state=unchecked]:!bg-gray-300"
          />
        </div>
      ),
    },
    {
      accessorKey: 'crDate',
      header: '생성일',
      cell: (row) => <div>{formatDateFullForUTC(row.row.original.crDate)}</div>,
    },
    {
      accessorKey: 'upDate',
      header: '수정일',
      cell: (row) => <div>{formatDateFullForUTC(row.row.original.upDate)}</div>,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={list}
      usePagination={usePagination}
      pagination={pagination}
      setPagination={setPagination}
      pageable={pageable}
    />
  )
}

export default memo(ListCardList)
