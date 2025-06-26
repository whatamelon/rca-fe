/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { ko } from 'date-fns/locale'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/components/element/Popover'
import { FilterDatePickerProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'
import { Calendar } from '../form/Calendar'
import CommonFilterTitleBox from './title/FilterTitleBox'

export default function CommonFilterDatePicker({ title, dates, dateList, setValue, className }: FilterDatePickerProps) {
  const [localDate, setLocalDate] = useState<Date>(null)

  const maskedDate = useMemo(() => {
    if (dates.date !== '' && dates.date.toString().length > 10) {
      return dayjs(dates.date).format('YYYY-MM-DD')
    }
    return dates.date
  }, [dates])

  useEffect(() => {
    const date = new Date(dates.date)
    setLocalDate(date)
  }, [dates])

  /**
   * 날짜를 업데이트하는 emit을 호출하는 함수
   */
  const updateDate = (date: Date) => {
    setValue({
      selectedDate: '',
      date: dayjs(date).format('YYYY-MM-DD'),
    })
  }

  /**
   * 캘린터를 통한 날짜 선택이 아닌, 버튼 클릭으로 날짜 선택 시 실행되는 함수
   */
  const onSelectDate = (code: string) => {
    if (dates.selectedDate === code) {
      setValue({
        selectedDate: '',
        date: '',
      })
    } else {
      let v = ''
      switch (code) {
        case 'today':
          setLocalDate(dayjs().toDate())
          v = dayjs().format('YYYY-MM-DD')
          break
        case '1day':
          setLocalDate(dayjs().add(1, 'day').toDate())
          v = dayjs().add(1, 'day').format('YYYY-MM-DD')
          break
        case '2day':
          setLocalDate(dayjs().add(2, 'day').toDate())
          v = dayjs().add(3, 'day').format('YYYY-MM-DD')
          break
        case '1week':
          setLocalDate(dayjs().add(1, 'week').toDate())
          v = dayjs().add(1, 'week').format('YYYY-MM-DD')
          break
        case '1month':
          setLocalDate(dayjs().add(1, 'month').toDate())
          v = dayjs().add(1, 'month').format('YYYY-MM-DD')
          break
        case '2month':
          setLocalDate(dayjs().add(2, 'month').toDate())
          v = dayjs().add(2, 'month').format('YYYY-MM-DD')
          break
        case '3month':
          setLocalDate(dayjs().add(3, 'month').toDate())
          v = dayjs().add(3, 'month').format('YYYY-MM-DD')
          break
        case '6month':
          setLocalDate(dayjs().add(6, 'month').toDate())
          v = dayjs().add(6, 'month').format('YYYY-MM-DD')
          break
        case '1year':
          setLocalDate(dayjs().add(1, 'year').toDate())
          v = dayjs().add(1, 'year').format('YYYY-MM-DD')
          break
        default:
          break
      }
      setValue({
        selectedDate: code,
        date: v,
      })
    }
  }

  return (
    <div className={cn('flex w-full', className)}>
      {title && <CommonFilterTitleBox title={title} />}

      <div className="flex w-[calc(100%-120px)] gap-x-2 gap-y-2 px-2 py-1">
        {dateList.map((date) =>
          dates.selectedDate === date.code ? (
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
            <label className="relative h-full w-32 cursor-pointer">
              <input
                defaultValue={maskedDate}
                placeholder="선택일자"
                className="body-1-r h-full w-full rounded-[8px] border border-gray-200 px-3 text-black hover:border-blue-500"
              />
            </label>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white p-0">
            <Calendar
              locale={ko}
              showOutsideDays
              pagedNavigation
              mode="single"
              selected={localDate}
              onSelect={updateDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
