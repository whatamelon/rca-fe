'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      position="top-center"
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          error: 'group-[.toast]:bg-red-500 group-[.toast]:text-white',
          warning: 'group-[.toast]:bg-yellow-500 group-[.toast]:text-white',
          success: 'group-[.toast]:bg-green-500 group-[.toast]:text-white',
          info: 'group-[.toast]:bg-blue-500 group-[.toast]:text-white',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
