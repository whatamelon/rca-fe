/* eslint-disable react/no-unstable-nested-components */

'use client'

import { DragEndEvent } from '@dnd-kit/core'
import { ColumnDef } from '@tanstack/react-table'
import { MenuIcon } from 'lucide-react'

import { ComponentResponseType } from '@/lib/types/component'
import { formatDateFullForUTC } from '@/lib/utils/format/date'
import { formatContentsTypeName } from '@/lib/utils/format/others/formatHc'

import CommonLinkId from '@/lib/components/global/link/Id'
import { DataTable } from '@/lib/components/global/table/DataTable'
import { Button } from '@/lib/components/element/button/Button'
import { Switch } from '@/lib/components/element/Switch'

export default function ListHome({
  list,
  handleUseFlag,
  handleDelete,
  changeOrderIdx,
}: {
  list: ComponentResponseType[]
  handleUseFlag: (componentId: number, useFlag: boolean, contentIds: string) => void
  handleDelete: (componentId: number) => void
  changeOrderIdx: (event: DragEndEvent) => void
}) {
  const columns: ColumnDef<ComponentResponseType>[] = [
    {
      accessorKey: 'componentId',
      header: '컴포넌트 ID',
      cell: (row) => <CommonLinkId id={row.row.original.componentId.toString()} route="component" />,
    },
    {
      accessorKey: 'typeCode',
      header: '타입',
      cell: (row) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {formatContentsTypeName(row.row.original.typeCode)}
        </div>
      ),
      size: 200,
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
      accessorKey: 'subtitle',
      header: '부제목',
      cell: (row) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.row.original.subtitle ?? '-'}</div>
      ),
      size: 200,
    },
    {
      accessorKey: 'contentIds',
      header: '연결된 컨텐츠 ID',
      cell: (row) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.row.original.contentIds ?? '-'}</div>
      ),
      size: 200,
    },
    {
      accessorKey: 'useFlag',
      header: '앱노출 여부',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={row.row.original.useFlag}
            onCheckedChange={() =>
              handleUseFlag(row.row.original.componentId, !row.row.original.useFlag, row.row.original.contentIds)
            }
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
    {
      accessorKey: 'deleteButton',
      header: '',
      cell: (row) => (
        <Button size="small" fill="red" rounded="lg" onClick={() => handleDelete(row.row.original.componentId)}>
          삭제
        </Button>
      ),
    },
    {
      accessorKey: 'orderButton',
      header: '',
      cell: () => <MenuIcon color="#667085" />,
    },
  ]

  return <DataTable columns={columns} data={list} usePagination={false} changeOrderIdx={changeOrderIdx} isOrderable />
}
