'use client'

import dynamicIconImports from 'lucide-react/dynamicIconImports'
import dynamic from 'next/dynamic'
import { FC, memo } from 'react'

type IconName = keyof typeof dynamicIconImports

const icons = Object.keys(dynamicIconImports) as IconName[]

type ReactComponent = FC<{ className?: string }>
const iconsComponents = {} as Record<IconName, ReactComponent>

// eslint-disable-next-line no-restricted-syntax
for (const name of icons) {
  const NewIcon = dynamic(dynamicIconImports[name], { ssr: false }) as ReactComponent
  iconsComponents[name] = NewIcon
}

type DynamicIconProps = {
  name: IconName
  className?: string
  id?: string
}

function DynamicIconComponent({ name, id, ...props }: DynamicIconProps) {
  const Icon = iconsComponents[name]
  if (!Icon) return null
  return <Icon {...props} />
}

const DynamicIcon = memo(DynamicIconComponent)
DynamicIcon.displayName = 'DynamicIcon'

export default DynamicIcon
