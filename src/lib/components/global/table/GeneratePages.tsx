'use client'

// this implementation can be a bit jumpy for larger tables, but should be good for most and easily adaptable if not
// this file is where your logic for how when ellipses are shown and other fiddly bits

import { JSX } from 'react'

import { PaginationEllipsis, PaginationItem, PaginationLink } from '@/lib/components/element/Pagination'

export const generatePaginationLinks = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
) => {
  const pages: JSX.Element[] = []
  const maxVisible = 15
  const sideCount = 7

  // 1. 전체 페이지가 15개 이하라면 모두 보여줌
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={`key-${i}`}>
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    return pages
  }

  // 2. 보여줄 페이지 범위 계산
  let start = Math.max(1, currentPage - sideCount)
  let end = Math.min(totalPages, currentPage + sideCount)

  // 3. 범위가 15개 미만이면 앞/뒤로 확장
  if (end - start + 1 < maxVisible) {
    if (start === 1) {
      end = Math.min(totalPages, start + maxVisible - 1)
    } else if (end === totalPages) {
      start = Math.max(1, end - maxVisible + 1)
    } else {
      // 중간에 걸친 경우, 앞/뒤로 균등하게 확장
      const remain = maxVisible - (end - start + 1)
      const addToStart = Math.min(remain, start - 1)
      const addToEnd = remain - addToStart
      start -= addToStart
      end = Math.min(totalPages, end + addToEnd)
    }
  }

  // 4. 항상 첫 페이지 (start > 1일 때만)
  if (start > 1) {
    pages.push(
      <PaginationItem key="key-1">
        <PaginationLink onClick={() => onPageChange(1)} isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>,
    )
    if (start > 2) {
      pages.push(<PaginationEllipsis key="ellipsis-left" />)
    }
  }

  // 5. start~end 범위 (1, totalPages도 포함)
  for (let i = start; i <= end; i++) {
    pages.push(
      <PaginationItem key={`key-${i}`}>
        <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
          {i}
        </PaginationLink>
      </PaginationItem>,
    )
  }

  // 6. 항상 마지막 페이지 (end < totalPages일 때만)
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push(<PaginationEllipsis key="ellipsis-right" />)
    }
    pages.push(
      <PaginationItem key={`key-${totalPages}`}>
        <PaginationLink onClick={() => onPageChange(totalPages)} isActive={currentPage === totalPages}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>,
    )
  }

  return pages
}
