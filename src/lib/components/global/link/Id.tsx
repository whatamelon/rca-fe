'use client'

import Link from 'next/link'

import { Button } from '@/lib/components/element/button/Button'
import { LinkIdProps } from '@/lib/types/component'

import { cn } from '@/lib/components/element/utils'

export default function CommonLinkId({ id, route, className, typeCode }: LinkIdProps) {
  const activeRoute = () => {
    if (id === '' || id === '-' || id === null) return 'noid'
    if (route === 'content' || route === 'component') {
      return 'good'
    }
    return 'nodetailpage'
  }

  const settingRoute = () => {
    switch (route) {
      case 'content':
        return `/content/${id}?typeCode=${typeCode}`
      case 'component':
        return `/cpnt/${id}`
      default:
        return ''
    }
  }

  const onCopyId = () => {
    const t = document.createElement('textarea')
    document.body.appendChild(t)
    t.value = id!.toString()
    t.select()
    document.execCommand('copy')
    document.body.removeChild(t)
  }

  if (activeRoute() === 'good' && id) {
    return (
      <Link
        href={settingRoute()}
        onClick={() => {
          sessionStorage.setItem('fromCpntEvent', 'true')
        }}
        className={`${cn(className)} subhead-2-b cursor-pointer !underline`}
      >
        #{id}
      </Link>
    )
  }

  if (activeRoute() === 'nodetailpage') {
    return (
      <Button className={`${cn(className)} subhead-2-b cursor-pointer text-start`} onClick={onCopyId}>
        #{id}
      </Button>
    )
  }

  return <div className={`${cn(className)}`} />
}
