import parse from 'html-react-parser'
import { createRoot } from 'react-dom/client'

import { Button } from '@/lib/components/element/button/Button'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './AlertDialog'

interface ConfirmDialogProps {
  title: string
  body: string
  buttonPosition?: 'left' | 'right'
  actionName?: string
  cancelName?: string
  icons?: React.ReactNode
}

const ConfirmDialogComponent = function ConfirmDialogComponent({
  title,
  body,
  buttonPosition = 'right',
  actionName = '확인',
  cancelName = '취소',
  icons,
}: ConfirmDialogProps) {
  if (typeof window === 'undefined') {
    return null
  }
  return new Promise((resolve) => {
    const containerElement = document.createElement('div')
    document.body.appendChild(containerElement)
    const root = createRoot(containerElement)

    const handleClose = (result: boolean) => {
      root.unmount()
      containerElement.remove()
      resolve(result)
    }

    root.render(
      <AlertDialog open onOpenChange={() => handleClose(false)}>
        <AlertDialogContent className="max-w-[335px] px-6 py-8 shadow-none">
          <AlertDialogHeader>
            {icons && (
              <div className="mx-auto mb-6 w-full">
                <div className="mx-auto flex h-[80px] w-[80px] rounded-2xl bg-gray-50">
                  <div className="mx-auto my-auto flex w-fit">
                    <div>{icons}</div>
                  </div>
                </div>
              </div>
            )}

            <AlertDialogTitle className="text-display-1-b pb-4">{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-body-2-r mb-6">{parse(body)}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className={`${buttonPosition === 'left' ? 'justify-start' : 'justify-end'} space-x-2`}>
            <Button fill="gray" onClick={() => handleClose(false)}>
              {cancelName}
            </Button>
            <Button onClick={() => handleClose(true)}>{actionName}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    )
  })
}

ConfirmDialogComponent.displayName = 'ConfirmDialog'

export const ConfirmDialog = ConfirmDialogComponent
