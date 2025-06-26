'use client'

import { setCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/components/element/Accordion'
import { Button } from '@/lib/components/element/button/Button'
import DynamicIcon from '@/lib/components/element/DynamicIcon'
import { NavigationType } from '@/lib/types/app'

export default function NavigationBar({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const navList: NavigationType[] = [
    {
      name: '홈',
      icon: 'layout-dashboard',
      route: '/',
      subMenus: [],
      subMenusOpen: false,
    },
    {
      name: '페이지',
      icon: 'app-window-mac',
      route: 'key_for_nuxtlink_page',
      subMenus: [
        {
          name: '홈',
          route: '/pg/home',
        },
      ],
      subMenusOpen: false,
    },
    {
      name: '컴포넌트',
      icon: 'monitor-cog',
      route: 'key_for_nuxtlink_component',
      subMenus: [
        {
          name: '바텀시트',
          route: '/cpnt/bottomsheet',
        },
        {
          name: '메인배너',
          route: '/cpnt/mainbanner',
        },
        {
          name: '퀵버튼',
          route: '/cpnt/quickbutton',
        },
        {
          name: '브랜드리스트',
          route: '/cpnt/brandlist',
        },
        {
          name: '기획전',
          route: '/cpnt/event',
        },
        {
          name: '서브배너',
          route: '/cpnt/subbanner',
        },
      ],
      subMenusOpen: false,
    },
    {
      name: 'PC 레이아웃',
      icon: 'gallery-horizontal',
      route: '/pclayout',
      subMenus: [],
      subMenusOpen: false,
    },
  ]

  if (pathname === '/login') {
    return null
  }

  const resetCookie = () => {
    setCookie('cpnt_event_filter_use_flag', '')
    setCookie('cpnt_event_filter_search_type', '')
    setCookie('cpnt_event_filter_search_value', '')
    setCookie('cpnt_event_page', '1')
    setCookie('cpnt_bottomsheet_page', '1')
    setCookie('cpnt_mainbanner_page', '1')
    setCookie('cpnt_quickbutton_page', '1')
    setCookie('cpnt_brandlist_page', '1')
    setCookie('cpnt_subbanner_page', '1')
  }

  return (
    <aside
      className={`h-dvh data-[open=false]:w-14 data-[open=false]:hover:w-[200px] data-[open=true]:w-[200px] ${
        open ? 'sticky' : 'fixed'
      } group/item top-0 left-0 z-30 shrink-0 bg-white py-4 transition-all duration-200`}
      data-open={open}
    >
      <div className="mb-2.5 flex w-full justify-between px-4">
        <Button
          onClick={() => router.push('/')}
          className="data-[open=false]:hidden data-[open=false]:hover:block data-[open=true]:block"
        >
          <Image src="/img/logo.png" width={134} height={11} alt="logo" className="w-[134px] cursor-pointer" />
        </Button>
        <Button onClick={() => setOpen(!open)}>
          {open ? <DynamicIcon name="chevron-first" /> : <DynamicIcon name="chevron-last" />}
        </Button>
      </div>

      <nav>
        <ul>
          {navList.map((menu) => {
            if (!menu.subMenus || menu.subMenus.length === 0) {
              return (
                <li className="px-2 py-1" key={menu.route}>
                  <Button
                    className={`h-10 rounded-lg px-2 py-1 hover:bg-gray-200 ${pathname === menu.route ? 'bg-brown-100 text-brown-600' : ''}`}
                    asChild
                  >
                    <Link
                      href={menu.route}
                      onClick={resetCookie}
                      className="flex w-full !items-start !justify-start gap-2"
                    >
                      <DynamicIcon name={menu.icon} className="text-24xl menu-icon my-auto" />
                      {/* {open && (
                        <p className="subhead-2-b my-auto transition-all duration-300">{menu.name}</p>
                      )} */}
                      <p className="subhead-2-b my-auto transition-all duration-300 data-[open=false]:hidden data-[open=false]:hover:block data-[open=true]:block">
                        {menu.name}
                      </p>
                    </Link>
                  </Button>
                </li>
              )
            }

            return (
              <li className="px-2 py-1" key={menu.route}>
                <Accordion type="single" collapsible>
                  <AccordionItem value={menu.route}>
                    <AccordionTrigger
                      className={`rounded-lg px-2 py-1 hover:bg-gray-200 data-[active=true]:bg-blue-100 group-hover/item:data-[active=true]:bg-transparent group-hover/item:data-[active=true]:*:text-black group-hover/item:data-[active=true]:hover:bg-gray-200 data-[active=true]:[&_.menu-icon]:fill-blue-500 group-hover/item:data-[active=true]:[&_.menu-icon]:fill-gray-900 ${!open ? '[&_#accordion-icon]:hidden group-hover/item:[&_#accordion-icon]:block' : ''} ${menu.subMenus.some((sub) => pathname.includes(sub.route)) && !open ? 'data-[active=true]' : ''} ${menu.subMenus.some((sub) => pathname.includes(sub.route)) ? 'bg-brown-100 text-brown-600' : ''}`}
                      data-active={menu.subMenus.some((subMenu) => pathname.includes(subMenu.route)) && !open}
                    >
                      <div className="flex items-center rounded-lg">
                        <div className="flex h-10 w-full items-center justify-start gap-2">
                          <DynamicIcon name={menu.icon} className="text-24xl menu-icon my-auto shrink-0" />
                          <p className={`${open ? 'block' : 'hidden'} subhead-2-b group-hover/item:block`}>
                            {menu.name}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    {menu.subMenus.map((subMenu) => (
                      <AccordionContent key={subMenu.route}>
                        <Button
                          className={`h-10 w-full rounded-lg px-2 hover:bg-gray-200 ${pathname.includes(subMenu.route) ? 'bg-brown-100 text-brown-600' : ''}`}
                          asChild
                        >
                          <Link href={subMenu.route} onClick={resetCookie} className="flex w-full justify-start pl-10">
                            <p className="subhead-2-b text-gray-600">{subMenu.name}</p>
                          </Link>
                        </Button>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
