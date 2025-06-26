'use client'

import { useEffect } from 'react'

/**
 * 뒤로가기 detect
 * @param leaveFunction 뒤로가기 시 사용할 함수
 */
export const useOnLeavePage = ({ leaveFunction }: { leaveFunction: () => void }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, document.title, window.location.href)
    }
    window.addEventListener('popstate', leaveFunction)

    return () => {
      window.removeEventListener('popstate', leaveFunction)
    }
  }, [])
}
