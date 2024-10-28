
"use client";

import { sideBarAdmin } from "@/data/admin-data/sidebar";
import { Flex, Progress, ProgressProps } from "antd";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
type Props = {
  role: any
}
export default function SideBar(props: Props) {
  const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  const conicColors: ProgressProps['strokeColor'] = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };
  const roleValue = props.role === "user_role" ? 1 : 2;
  const listSideBar = sideBarAdmin;
  const pathName = usePathname();
  const [showSideBar, setShowSideBar] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string>("");
  return (
    <div className={`h-10 ${showSideBar ? 'w-[220px]' : 'w-[70px]'}`}>
      <div className={`fixed z-50 left-0 h-screen px-3 py-4 overflow-y-auto bg-neutral-950 text-stone-100 ${showSideBar ? 'w-[220px]' : 'w-[70px]'}`}>
        <Link href="/" className="flex items-center ps-2.5 mb-5">
          {showSideBar ?
            <Image
              src="/image/logo-wh.png"
              alt="Logo"
              width={150} // Set an arbitrary width
              height={0} // Set an arbitrary height
              className="object-contain" // Use CSS to maintain aspect ratio
            />
            :
            <Image
              src="/image/logo.png"
              alt="Logo"
              width={150} // Set an arbitrary width
              height={0} // Set an arbitrary height
              className="object-contain" // Use CSS to maintain aspect ratio
            />
          }
        </Link>
        <div className="pl-2 mb-4">
          <button onClick={() => setShowSideBar(!showSideBar)} className="border p-2 rounded text-stone-400 border-stone-400 hover:border-stone-100 hover:text-stone-100">
            {showSideBar ? <ArrowLeftFromLine size={16} /> : <ArrowRightFromLine size={16} />}
          </button>
        </div>
        {(showSideBar && roleValue==2) &&
          <div className="pl-2 py-2 text-sm">
            <span className="">Get your shop ready</span>
            <Flex vertical gap="middle">
              <Progress percent={25} strokeColor={twoColors} />
            </Flex>
            <span>1/4</span>
          </div>
        }
        {listSideBar &&
          listSideBar.map((item, index: number) => (
            <div key={index} className="mb-2 border-b border-stone-700">
              {showSideBar && <p className="pl-4 font-bold text-stone-500 mb-1">{item.title}</p>}
              {item.listItems.map((childItem, childIndex: number) => {
                if (childItem.role.includes(roleValue)) {
                  return (
                    <ul key={childIndex} className="space-y-2 font-medium">
                      <li className="relative" onMouseEnter={() => setHoveredItem(childItem.name)} onMouseLeave={() => setHoveredItem("")}>
                        <Link href={childItem.href} className={`flex px-4 childItems-center text-xs py-4 rounded text-gray-200 hover:bg-neutral-600 group ${pathName === childItem.href ? "bg-neutral-600" : ""}`}>
                          {childItem.icon && <childItem.icon size={16} className='font-bold' />}
                          {showSideBar && <span className="ms-3 font-bold">{childItem.name}</span>}
                          {(hoveredItem === childItem.name && !showSideBar) ?
                            <div className="fixed left-16">
                              <div className="relative">
                                <div className="absolute bg-black p-4 top-[-16px] rounded">
                                  <span className="font-bold">{childItem.name}</span>
                                </div>
                              </div>

                            </div>
                            : ''
                          }
                        </Link>
                      </li>
                    </ul>
                  )
                }
                return "";
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
}
