'use client'

/* eslint-disable jsx-a11y/label-has-associated-control */
import { ko } from 'date-fns/locale'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/components/element/Popover'
import { DateRangeType, FilterDateRangeProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'
import { Calendar } from '../form/Calendar'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterDateRange({ title, dates, dateList, setValue, className }: FilterDateRangeProps) {
  const [localRange, setLocalRange] = useState<DateRangeType>(null)

  const maskedDate = useMemo(() => {
    if (dates.from === null && dates.to === null) {
      return {
        from: '',
        to: '',
      }
    }
    if (dates.selectedRange === '') {
      return {
        from: dayjs(dates.from).format('YYYY.MM.DD'),
        to: dayjs(dates.to).format('YYYY.MM.DD'),
      }
    }
    if (dates.selectedRange !== '') {
      return {
        from: dayjs(dates.from).format('YYYY.MM.DD'),
        to: dayjs(dates.to).format('YYYY.MM.DD'),
      }
    }
    return {
      from: dates.from.toString(),
      to: dates.to.toString(),
    }
  }, [dates])

  useEffect(() => {
    if (dates.from === null || dates.to === null) {
      return
    }
    setLocalRange({
      from: new Date(dates.from),
      to: new Date(dates.to),
    })
  }, [dates])

  /**
   * 날짜를 업데이트하는 emit을 호출하는 함수
   */
  const updateDate = (date: DateRangeType) => {
    setValue({
      selectedRange: '',
      from: date.from ?? date.to,
      to: date.to ?? date.from,
    })
  }

  /**
   * 캘린터를 통한 날짜 선택이 아닌, 버튼 클릭으로 날짜 선택 시 실행되는 함수
   */
  const onSelectDate = (code: string) => {
    if (dates.selectedRange === code) {
      setValue({
        selectedRange: '',
        from: null,
        to: null,
      })
    } else {
      let v = null
      switch (code) {
        case 'today':
          setLocalRange({
            from: new Date(),
            to: new Date(),
          })
          v = dayjs().toDate()
          break
        case 'yesterday':
          setLocalRange({
            from: dayjs().subtract(1, 'day').toDate(),
            to: new Date(),
          })
          v = dayjs().subtract(1, 'day').toDate()
          break
        case '1week':
          setLocalRange({
            from: dayjs().subtract(1, 'week').toDate(),
            to: new Date(),
          })
          v = dayjs().subtract(1, 'week').toDate()
          break
        case '1month':
          setLocalRange({
            from: dayjs().subtract(1, 'month').toDate(),
            to: new Date(),
          })
          v = dayjs().subtract(1, 'month').toDate()
          break
        case '2month':
          setLocalRange({
            from: dayjs().subtract(2, 'month').toDate(),
            to: new Date(),
          })
          v = dayjs().subtract(2, 'month').toDate()
          break
        case '3month':
          setLocalRange({
            from: dayjs().subtract(3, 'month').toDate(),
            to: new Date(),
          })
          v = dayjs().subtract(3, 'month').toDate()
          break
        case '6month':
          setLocalRange({
            from: dayjs().subtract(6, 'month').toDate(),
            to: new Date(),
          })
          v = dayjs().subtract(6, 'month').toDate()
          break
        case '1year':
          setLocalRange({
            from: dayjs().subtract(1, 'year').toDate(),
            to: new Date(),
          })
          v = dayjs().subtract(1, 'year').toDate()
          break
        default:
          break
      }
      setValue({
        selectedRange: code,
        from: v,
        to: new Date(),
      })
    }
  }

  return (
    <div className={cn('flex w-full', className)}>
      {title && <CommonFilterTitleBox title={title} />}

      <div className="flex w-[calc(100%-120px)] gap-x-2 gap-y-2 px-2 py-1">
        {dateList.map((date) =>
          dates.selectedRange === date.code ? (
            <Button key={date.code} onClick={() => onSelectDate(date.code)} size="medium" rounded="lg" fill="blue">
              {date.name}
            </Button>
          ) : (
            <Button
              key={date.code}
              onClick={() => onSelectDate(date.code)}
              size="medium"
              className="hover:border-blue-500"
              rounded="lg"
              line="gray"
            >
              {date.name}
            </Button>
          ),
        )}
        <Popover>
          <PopoverTrigger>
            <div className="flex h-full w-full items-center gap-x-2">
              <label className="relative h-full w-32 cursor-pointer">
                <input
                  defaultValue={maskedDate.from?.toString()}
                  placeholder="시작일"
                  className="body-1-r h-full w-full rounded-[8px] border border-gray-200 px-3 text-black hover:border-blue-500"
                />
              </label>
              <p className="body-2-r my-auto text-black">~</p>
              <label className="relative h-full w-32 cursor-pointer">
                <input
                  defaultValue={maskedDate.to?.toString()}
                  placeholder="종료일"
                  className="body-1-r h-full w-full rounded-[8px] border border-gray-200 px-3 text-black hover:border-blue-500"
                />
              </label>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white p-0">
            <Calendar
              locale={ko}
              showOutsideDays
              pagedNavigation
              numberOfMonths={2}
              mode="range"
              selected={localRange}
              onSelect={updateDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
