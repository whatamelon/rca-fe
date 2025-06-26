
import { Button } from "@/lib/components/element/button/Button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/element/Accordion";
import { usePathname } from 'next/navigation';
import DynamicIcon from '../../element/DynamicIcon';
import Link from 'next/link';

const menuList = [
  {
    id: 1,
    url: "/",
    name: "홈",
    icon: <DynamicIcon name="home" className="fill-gray-900" />,
  },
  {
    id: 2,
    url: "/credit",
    name: "크레딧관리",
    icon: <DynamicIcon name="credit-card" className="fill-gray-900" />,
  },
  {
    id: 3,
    url: "/ip",
    name: "매입관리",
    icon: (
      <DynamicIcon name="inbox" className="shrink-0 fill-gray-900" />
    ),
    subMenu: [
      {
        id: 1,
        url: "/ip",
        name: "매입패키지",
      },
      {
        id: 2,
        url: "/item",
        name: "매입상품",
      },
      {
        id: 3,
        url: "/inspect",
        name: "매입검수",
      },
    ],
  },
  {
    id: 4,
    url: "",
    name: "bar",
  },
  {
    id: 5,
    url: "/wash",
    name: "세탁관리",
    icon: (
      <DynamicIcon name="shirt" className="shrink-0 fill-gray-900" />
    ),
  },
];

export default function NavigationBarSecond({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  let location = usePathname();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <aside
      className={`data-[open=true]:w-[200px] data-[open=false]:hover:w-[200px] data-[open=false]:w-14 h-dvh ${
        open ? "sticky" : "fixed"
      } top-0 left-0 bg-white z-30 transition-all duration-200 group/item shrink-0`}
      data-open={open}
    >
      {/* navigation header */}
      <div className="flex items-center justify-center gap-3 my-3">
        <div
          className={`${
            open ? "block" : "hidden w-0"
          } group-hover/item:block group-hover/item:w-auto`}
        >
          <img
            src="/images/logo.png"
            alt="Relay Trade-in Manager"
            className="w-[134px]"
          />
        </div>
        <button
          type="button"
          className="cursor-pointer h-9"
          onClick={handleOpen}
        >
          <DynamicIcon name="chevron-right" className={`fill-gray-400 ${open && "rotate-180"}`} />
        </button>
      </div>

      {/* navigation menu */}
      <nav>
        <ul className="overlfow-hidden whitespace-nowrap">
          {menuList.map((menu) => {
            // ========== 구분선 ==========
            if (menu.name === "bar") {
              return (
                <div
                  className="mx-2 my-2 border-b border-gray-200"
                  key={menu.id}
                />
              );
            }

            // ========== 단일 메뉴인 경우 ==========
            if (!menu.subMenu) {
              return (
                <li className="px-2 py-1" key={menu.id}>
                  <Button
                    className="px-2 py-1 h-10 hover:bg-gray-200 rounded-lg data-[active=true]:bg-blue-100 data-[active=true]:*:text-blue-600 data-[active=true]:[&_svg]:fill-blue-600"
                    data-active={location === menu.url}
                    asChild
                  >
                    <Link
                      href={menu.url}
                      className="flex items-center justify-start gap-2 w-full"
                    >
                      {menu.icon}
                      <p
                        className={`${
                          open ? "visible" : "invisible"
                        } text-subhead-2-b group-hover/item:visible`}
                      >
                        {menu.name}
                      </p>
                    </Link>
                  </Button>
                </li>
              );
            }

            // ========== 서브 메뉴가 있는 경우 ==========
            else {
              return (
                <li className="px-2 py-1" key={menu.id}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={menu.url}>
                      {/* 상위 메뉴 */}
                      <AccordionTrigger
                        className={`px-2 py-1 h-10 hover:bg-gray-200 rounded-lg data-[active=true]:[&_#menu-icon]:fill-blue-500 data-[active=true]:bg-blue-100
                          group-hover/item:data-[active=true]:bg-transparent group-hover/item:data-[active=true]:hover:bg-gray-200 group-hover/item:data-[active=true]:*:text-black group-hover/item:data-[active=true]:[&_#menu-icon]:fill-gray-900 
                          ${
                            !open &&
                            "group-hover/item:[&_#accordion-icon]:block [&_#accordion-icon]:hidden"
                          } `}
                        data-active={
                          menu.subMenu.some((subMenu) =>
                            location.includes(subMenu.url)
                          ) && !open
                        }
                      >
                        <div className="rounded-lg flex items-center">
                          <div className="flex items-center justify-start gap-2 w-full">
                            {menu.icon}
                            <p
                              className={`${
                                open ? "block" : "hidden"
                              } text-subhead-2-b group-hover/item:block`}
                            >
                              {menu.name}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>

                      {/* 서브 메뉴 */}
                      {menu.subMenu.map((subMenu) => (
                        <AccordionContent
                          className={`${
                            open ? "block" : "hidden"
                          } text-subhead-2-b group-hover/item:block`}
                          key={subMenu.id}
                        >
                          <Button
                            className="px-2 py-1 mt-1 h-10 hover:bg-gray-200 rounded-lg"
                            data-active={location.includes(
                              subMenu.url
                            )}
                            asChild
                          >
                            <Link
                              href={subMenu.url}
                              className="w-full flex justify-start pl-10 data-[active=true]:bg-blue-100 data-[active=true]:*:text-blue-600"
                            >
                              <p className="text-subhead-2-b">{subMenu.name}</p>
                            </Link>
                          </Button>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  </Accordion>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </aside>
  );
}