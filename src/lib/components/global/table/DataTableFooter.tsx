'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { Table } from '@tanstack/react-table'

import Paginator from './Paginator'

interface DataTableFooterProps<TData> {
  table: Table<TData>
  data: TData[]
  useSelectedRow?: boolean
  usePerRowCount?: boolean
  usePagination?: boolean
  getChangedPage?: (page: number) => void
}

export function DataTableFooter<TData>({
  table,
  data,
  useSelectedRow = false,
  usePerRowCount = false,
  usePagination = false,
  getChangedPage,
}: DataTableFooterProps<TData>) {
  return (
    <div
      className={`${usePagination === true && useSelectedRow === false && usePerRowCount === false && `justify-center`} flex items-center justify-between rounded-b-lg border-x border-b border-x-gray-200 border-b-gray-200 bg-white px-2 py-4`}
    >
      {useSelectedRow && (
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
      )}

      <div className="flex items-center space-x-6 lg:space-x-8">
        {usePerRowCount && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {usePagination && data.length > 0 && (
          <Paginator
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(page) => {
              table.setPageIndex(page - 1)
              getChangedPage?.(page)
            }}
            showPreviousNext
          />
        )}
      </div>
    </div>
  )
}
