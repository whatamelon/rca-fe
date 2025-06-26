/**
 * ==============================================================================
 * @fileoverview Headers
 * @description Headers 컴포넌트를 정의합니다.
 * Headers 컴포넌트는 Header 컴포넌트를 사용하여 헤더를 렌더링합니다.
 * Header 컴포넌트는 back, logo, title, home, search, cart, close, backRoute 프로퍼티를 사용합니다.
 * useSelector 훅을 사용하여 로그인 상태를 확인하고, 로그인 상태에 따라 장바구니 버튼을 표시합니다.
 * @module global/Headers
 * ==============================================================================
 */

'use client'

import { Filter } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/lib/components/element/button/Button'
import { ButtonText } from '@/lib/components/element/button/ButtonText'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/element/select/Dropdown'
import { useAppDispatch, useAppSelector } from '@/lib/stores/hooks'
import { getActiveBrand, setActiveBrand } from '@/lib/stores/slice/appSlice'
import { getAdminInfo, setAdminInfo, setLoginState } from '@/lib/stores/slice/authSlice'
import { ActiveBrandType, HeaderProps } from '@/lib/types/app'
import { copyToClipboard } from '@/lib/utils/hook/copyToClipboard'

const CombineActDataDialog = dynamic(() => import('@/lib/components/feature/cpnt/filter/CombineActDataDialog'), {
  ssr: false,
})

const brandList = [
  {
    code: '10',
    name: 'Kolon',
    branddomain: 'kolon',
    filterUrlName: 'orm',
    korName: '오엘오',
  },
  {
    code: '20',
    name: 'NSR',
    branddomain: 'nsr',
    filterUrlName: 'nsr',
    korName: '엔에스알',
  },
  {
    code: '30',
    name: '포레포레',
    branddomain: 'greenforet',
    filterUrlName: 'greenforet',
    korName: '포레포레',
  },
]

export default function Headers({ back = false, id = '', title = '', backRoute = '', closeFunction }: HeaderProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const activeBrand = useAppSelector(getActiveBrand)
  const adminInfo = useAppSelector(getAdminInfo)

  const [openActFilter, setOpenActFilter] = useState<boolean>(false)

  const logout = () => {
    dispatch(setLoginState({ accessToken: '' }))
    dispatch(setAdminInfo({ id: '', password: '', adminId: 0, adminClass: '' }))
    router.push('/login')
  }

  const handleChangeBrand = (names: string) => {
    if (names !== activeBrand.name) {
      const selectBrand = brandList.filter((brand: ActiveBrandType) => brand.name === names)[0]
      dispatch(setActiveBrand(selectBrand))
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }
  const handleMyListItem = (value: string) => {
    if (value === 'password') {
      router.push('/my/password')
    } else {
      logout()
    }
  }

  return (
    <>
      <nav className="z-40 flex justify-between bg-transparent py-[14px] pr-5">
        <div className="flex space-x-3">
          {back === true && (
            <Button
              onClick={() => {
                if (closeFunction) {
                  closeFunction()
                } else if (backRoute) {
                  router.push(backRoute)
                } else {
                  router.back()
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="cursor-pointer"
              >
                <path
                  d="M14.4377 16.0009L21.0374 22.6005L19.1518 24.4861L10.6665 16.0009L19.1518 7.51562L21.0374 9.40124L14.4377 16.0009Z"
                  fill="#111827"
                />
              </svg>
            </Button>
          )}

          <p className="headline-b my-auto text-black">
            {title && <span>{title}</span>}

            {back === true && id && (
              <ButtonText onClick={() => copyToClipboard(id)} color="black">
                <span className="cursor-pointer">ID : {id}</span>
              </ButtonText>
            )}
          </p>

          <div className="w-[140px]">
            <Select onValueChange={handleChangeBrand} value={activeBrand.name}>
              <SelectTrigger className="h-10 bg-white py-2">
                <SelectValue defaultValue={activeBrand.name} placeholder="브랜드를 선택해주세요." />
              </SelectTrigger>
              <SelectContent sticky="partial" position="popper" sideOffset={0}>
                {brandList.map((optionValue) => (
                  <SelectItem key={optionValue.code} value={optionValue.name}>
                    {optionValue.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="h-8 w-8 cursor-pointer rounded-full border border-black bg-black">
            <Button onClick={() => setOpenActFilter(true)} className="mx-auto mt-1.5 flex w-fit text-center">
              <Filter width={20} height={20} className="text-white" />
            </Button>
          </div>

          <div className="w-[140px]">
            <Select onValueChange={handleMyListItem}>
              <SelectTrigger className="h-10 bg-white py-2">
                <SelectValue placeholder={adminInfo.id} />
              </SelectTrigger>
              <SelectContent sticky="partial" position="popper" sideOffset={0}>
                <SelectItem value="password">비밀번호 변경</SelectItem>
                <SelectItem value="logout">로그아웃</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>
      {openActFilter && <CombineActDataDialog open={openActFilter} setOpen={setOpenActFilter} />}
    </>
  )
}
