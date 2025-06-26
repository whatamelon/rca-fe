'use client'

import React, { createContext, useContext, useState } from 'react'

import { Spinner } from '@/lib/components/element/Spinner'

type LoadingScreenProps = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const LoadingScreenContext = createContext<LoadingScreenProps>({
  loading: false,
  setLoading: () => null,
})
export const useLoadingScreen = () => useContext(LoadingScreenContext)

export function LoadingScreenProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false)

  const value = React.useMemo(() => ({ loading, setLoading }), [loading, setLoading])

  return (
    <LoadingScreenContext.Provider value={value}>
      {loading && (
        <div className="fixed inset-0 z-[999] flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
          <Spinner />
        </div>
      )}
      {children}
    </LoadingScreenContext.Provider>
  )
}
