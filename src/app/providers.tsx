'use client'

import { ReactNode, useState } from 'react'

import { Toaster } from '@/lib/components/element/Sonner'
// import NavigationBar from '@/lib/components/global/navigation/NavigationBar'

interface ProvidersProps {
  readonly children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative flex h-full min-h-screen w-full bg-gray-100">
        {/* <NavigationBar open={open} setOpen={setOpen} /> */}

        <main className="min-w-[1200px] grow">
          <div className={`bg-gray-150 min-h-dvh ${!open && 'pl-14'}`}>{children}</div>
        </main>
      </div>
      <Toaster />
    </>
  )
}
