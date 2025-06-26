'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type PreventNavigationProps = {
  isDirty: boolean
  backHref: string
  resetData?: () => void
}

/**
 * 뒤로가기, 새로고침, 페이지 이탈 방지하는 hook
 * @param isDirty 변경사항이 있는지 여부. true면 화면이동 막음. false면 화면이동 허용
 * @param backHref 뒤로가기 시 이동할 경로
 * @param resetData 변경사항 초기화 함수
 * @returns  leavingPage: 페이지 이탈 여부, noCallback: 취소 콜백, yesCallback: 확인 콜백
 */
export const usePreventNavigation = ({ isDirty, backHref, resetData }: PreventNavigationProps) => {
  const [leavingPage, setLeavingPage] = useState(false)
  const router = useRouter()

  const confirmationFn = useRef<() => void>(() => {})

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement

      if (isDirty) {
        event.preventDefault()

        confirmationFn.current = () => {
          router.push(target.href)
        }

        setLeavingPage(true)
      }
    }

    const handlePopState = () => {
      if (isDirty) {
        window.history.pushState(null, document.title, window.location.href)

        confirmationFn.current = () => {
          router.push(backHref)
        }

        setLeavingPage(true)
      } else {
        window.history.back()
      }
    }

    // const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    //   if (isDirty) {
    //     e.preventDefault()
    //     e.returnValue = true
    //   }
    // }

    if (typeof window !== 'undefined') {
      window.history.pushState(null, document.title, window.location.href)
    }

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', handleClick)
    })
    window.addEventListener('popstate', handlePopState)
    // window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', handleClick)
      })
      window.removeEventListener('popstate', handlePopState)
      // window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])

  const noCallback = () => {
    setLeavingPage(false)
    confirmationFn.current = () => {}
  }

  const yesCallback = () => {
    confirmationFn.current()
    setLeavingPage(false)

    confirmationFn.current = () => {}

    if (resetData) {
      resetData()
    }
  }

  return {
    leavingPage,
    noCallback,
    yesCallback,
  }
}
