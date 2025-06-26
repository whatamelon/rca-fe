'use client'

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ColumnDef, flexRender, getCoreRowModel, Table, useReactTable } from '@tanstack/react-table'

import { PageableType } from '@/lib/types/global'

  import { TableBase, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/lib/components/element/Table'
import { DataTableFooter } from './DataTableFooter'
import DataTableRow from './DataTableRow'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  useSelectedRow?: boolean
  usePerRowCount?: boolean
  usePagination?: boolean
  pagination?: { pageIndex: number; pageSize: number }
  setPagination?: (pagination: { pageIndex: number; pageSize: number }) => void
  pageable?: PageableType
  isOrderable?: boolean
  changeOrderIdx?: (event: DragEndEvent) => void
  getChangedPage?: (page: number) => void
  isMaxHeight?: boolean
  maxHeight?: number
}

interface TableContentProps<TData, TValue> {
  table: Table<TData>
  columns: ColumnDef<TData, TValue>[]
  isOrderable: boolean
  sensors: ReturnType<typeof useSensors>
  changeOrderIdx?: (event: DragEndEvent) => void
}

function TableContent<TData, TValue>({
  table,
  columns,
  isOrderable,
  sensors,
  changeOrderIdx,
}: TableContentProps<TData, TValue>) {
  if (!table.getRowModel().rows) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={1} className="h-24 text-center">
            결과가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  // if (!table.getRowModel().rows?.length) {
  //   return (
  //     <TableBody>
  //       <TableRow>
  //         <TableCell colSpan={columns.length} className="h-24 text-center">
  //           결과가 없습니다.
  //         </TableCell>
  //       </TableRow>
  //     </TableBody>
  //   )
  // }

  if (!isOrderable) {
    return (
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={changeOrderIdx}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <div className="sr-only" aria-live="polite">
        드래그 앤 드롭으로 순서를 변경할 수 있습니다.
      </div>
      <SortableContext items={table.getRowModel().rows} strategy={verticalListSortingStrategy}>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <DataTableRow key={row.id} columns={columns} row={row} />
          ))}
        </TableBody>
      </SortableContext>
    </DndContext>
  )
}

export function DataTable<TData, TValue>({
  columns,
  data,
  useSelectedRow = false,
  usePerRowCount = false,
  usePagination = false,
  pagination,
  setPagination,
  pageable,
  isOrderable = false,
  changeOrderIdx,
  getChangedPage,
  isMaxHeight,
  maxHeight,
}: DataTableProps<TData, TValue>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    initialState: { pagination },
    onPaginationChange: setPagination,
    state: { pagination },
    pageCount: Math.ceil((pageable?.totalCount ?? 0) / (pageable?.pageSize ?? 0)),
    rowCount: pageable?.totalCount ?? 0,
  })

  return (
    <div>
      <div
        style={{
          maxHeight: isMaxHeight ? `${maxHeight}px` : 'none',
          overflowY: isMaxHeight ? 'auto' : 'visible',
        }}
        className="body-1-r rounded-t-md border bg-white"
      >
        <TableBase>
          <TableHeader className="sticky top-0 z-10 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableContent
            table={table}
            columns={columns}
            isOrderable={isOrderable}
            sensors={sensors}
            changeOrderIdx={changeOrderIdx}
          />
        </TableBase>
      </div>
      {usePagination && (
        <DataTableFooter
          table={table}
          data={data}
          useSelectedRow={useSelectedRow}
          usePerRowCount={usePerRowCount}
          usePagination={usePagination}
          getChangedPage={getChangedPage}
        />
      )}
    </div>
  )
}
