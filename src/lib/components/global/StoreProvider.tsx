'use client'

/**
 * ==============================================================================
 * @fileoverview Store Provider
 * @desc Store Provider 컴포넌트. store를 제공하는 컴포넌트
 * @module layout/StoreProvider
 * ==============================================================================
 */

import { setupListeners } from '@reduxjs/toolkit/query'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { AppStore, makeStore } from '../../stores/store'

interface Props {
  readonly children: ReactNode
}

export function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch)
      return unsubscribe
    }
  }, [])

  const persistor = persistStore(storeRef.current)

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
