import Link from 'next/link'

import Headers from '@/lib/components/global/Headers'

export default function Home() {
  return (
    <div>
      <Headers title="홈" back={false} />
      <div className="flex">
        {/* <img className="m-auto mt-20 h-fit w-[600px]" src="/img/gjsrtc.jpg" alt="migration" /> */}

        <div className="flex flex-col gap-4 text-black">
          <h1>Hello World</h1>
          <Link href="/login">Login</Link>
          <Link href="/cpnt/new">CpntNew</Link>
          <Link href="/content/new">ContentNew</Link>
          <Link href="/cpnt/1">CpntDetail</Link>
          <Link href="/content/1">ContentDetail</Link>
          <Link href="/cpnt/bottomsheet">CpntBottomsheet</Link>
          <Link href="/cpnt/event">CpntEvent</Link>
          <Link href="/cpnt/brandlist">CpntBrandlist</Link>
          <Link href="/cpnt/mainbanner">CpntMainbanner</Link>
          <Link href="/cpnt/quickbutton">CpntQuickbutton</Link>
          <Link href="/cpnt/subbanner">CpntSubbanner</Link>
          <Link href="/pclayout">PcLayout</Link>
        </div>
      </div>
    </div>
  )
}
