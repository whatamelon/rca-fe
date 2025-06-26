'use client'

import { deleteCookie, getCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { Button } from '@/lib/components/element/button/Button'
import { Textfield } from '@/lib/components/element/input/Textfield'
import { useLoginMutation } from '@/lib/stores/service/authApiSlice'
import { setAdminInfo, setLoginState } from '@/lib/stores/slice/authSlice'

export default function LoginPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const [loginTrigger] = useLoginMutation()

  const handleLogin = async () => {
    if (email && password) {
      const result = await loginTrigger({ aid: email, apw: password })
      if (result.data?.code === 'R000') {
        toast('로그인 성공!')
        dispatch(setLoginState({ accessToken: result.data?.data.accessToken }))
        dispatch(
          setAdminInfo({
            id: email,
            password,
            adminId: result.data?.data.adminId,
            adminClass: result.data?.data.adminClass,
          }),
        )
        if (hasCookie('recent-route')) {
          router.replace(await getCookie('recent-route'))
          deleteCookie('recent-route')
        } else {
          router.push('/')
        }
      } else if (result.data?.code === 'A001') {
        toast.error('이메일과 비밀번호를 확인해주세요.')
      } else if (result.data?.code === 'A003') {
        toast.error('아이디가 존재하지 않습니다.')
      } else if (result.data?.code === 'A004') {
        toast.error('비밀번호가 일치하지 않습니다.')
      } else {
        toast.error('로그인 실패!')
      }
    } else {
      toast.warning('이메일과 비밀번호를 입력해주세요.')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="mx-auto -mt-20 flex h-screen w-[768px] flex-col items-center justify-center">
      <h1 className="display-5-b font-bold">
        릴RELAY
        <br />
        컨CONCIERGE
        <br />
        어ADMIN
      </h1>
      <div className="mt-10 flex w-4/5 flex-col items-center justify-center gap-4">
        <Textfield placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
        <Textfield
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button onClick={handleLogin} width="full" size="xxlarge" fill="black" rounded="full">
          로그인
        </Button>
      </div>
    </div>
  )
}
