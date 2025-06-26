'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ColumnDef, flexRender, Row } from '@tanstack/react-table'

import { TableCell, TableRow } from '@/lib/components/element/Table'

export default function DataTableRow<T>({
  columns,
  row,
  noResult,
}: {
  columns: ColumnDef<T>[]
  row?: Row<T>
  noResult?: boolean
}) {
  const uniqueId = row?.id
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: uniqueId })
  const isCursorGrabbing = attributes['aria-pressed']
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (noResult) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          결과가 없습니다.
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableRow style={style} ref={setNodeRef} {...attributes} aria-label="드래그 가능한 행">
      {row.getVisibleCells().map((cell) => {
        if (cell.column.id === 'orderButton') {
          return (
            <TableCell
              key={cell.id}
              {...listeners}
              data-state={row.getIsSelected() && 'selected'}
              className={`${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          )
        }
        return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      })}
    </TableRow>
  )
}
