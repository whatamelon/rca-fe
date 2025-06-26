import { Spinner } from '@/lib/components/element/Spinner'

export default function Loading() {
  return (
    <div className="md:w-pc relative top-0 z-[90] flex h-dvh w-full items-center justify-center">
      <Spinner />
    </div>
  )
}
