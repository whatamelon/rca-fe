/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { memo } from 'react'

import { ContentListResponse } from '@/lib/types/contents'
import { PageableType } from '@/lib/types/global'
import { formatDateFullForUTC } from '@/lib/utils/format/date'

import CommonLinkId from '@/lib/components/global/link/Id'
import { DataTable } from '@/lib/components/global/table/DataTable'
import { Badge } from '@/lib/components/element/Badge'
import { Button } from '@/lib/components/element/button/Button'
import { Switch } from '@/lib/components/element/Switch'

function ListEventList({
  list,
  usePagination = false,
  pagination,
  setPagination,
  pageable,
  handleUseFlag,
  createComponent,
  getChangedPage,
}: {
  list: ContentListResponse[]
  usePagination?: boolean
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  pageable: PageableType
  handleUseFlag: (contentId: number, useFlag: boolean) => void
  createComponent: (title: string, subtitle: string, contentIds: string) => void
  getChangedPage?: (page: number) => void
}) {
  const columns: ColumnDef<ContentListResponse>[] = [
    {
      accessorKey: 'contentId',
      header: '컨텐츠 ID',
      cell: (row) => <CommonLinkId id={row.row.original.contentId.toString()} route="content" typeCode="EL" />,
    },
    {
      accessorKey: 'title',
      header: '제목',
      cell: (row) => <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.row.original.title}</div>,
      size: 200,
    },
    {
      accessorKey: 'body',
      header: '내용',
      cell: (row) => <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.row.original.body}</div>,
      size: 200,
    },
    {
      accessorKey: 'prodCount',
      header: '판매상품 갯수',
      cell: (row) => <div>{row.row.original.prodCount}</div>,
    },
    {
      accessorKey: 'useFlag',
      header: '연결컨텐츠 선택 가능 여부',
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
      accessorKey: 'displayFlag',
      header: '앱노출 여부',
      cell: (row) => (
        <>
          {row.row.original.displayFlag === true ? (
            <Badge size="small" fill="blue" rounded="small">
              노출
            </Badge>
          ) : (
            <Badge size="small" fill="gray" rounded="small">
              미노출
            </Badge>
          )}
        </>
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
    {
      accessorKey: 'createButton',
      header: '',
      cell: (row) => (
        <Button
          size="small"
          fill="blue"
          rounded="lg"
          onClick={() =>
            createComponent(row.row.original.title, row.row.original.body, row.row.original.contentId.toString())
          }
        >
          기획전 생성
        </Button>
      ),
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
      getChangedPage={getChangedPage}
    />
  )
}

export default memo(ListEventList)
