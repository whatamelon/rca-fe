import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { StoreProvider } from '@/lib/components/global/StoreProvider'

import { Providers } from './providers'

// 폰트 설정은 서버 컴포넌트에 남아 있어도 좋습니다.
const pretendard = localFont({
  src: [
    {
      path: '../../public/PretendardVariable.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/PretendardVariable.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})

// Metadata와 Viewport 설정은 그대로 둡니다.
export const metadata: Metadata = {
  title: 'Concierge Admin',
  description: 'Concierge Admin.',
  keywords: [],
  metadataBase: new URL('https://rca.the-relay.kr'),
  applicationName: 'Concierge Admin',
  icons: { icon: [{ url: '/img/favicon.ico' }, { url: '/img/favicon.png', type: 'image/png' }] },
  openGraph: {
    title: 'Concierge Admin',
    description: 'Concierge Admin.',
    images: '@/img/logo.png',
    url: 'https://rca.the-relay.kr',
    siteName: 'Concierge Admin',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: { canonical: 'https://rca.the-relay.kr' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <StoreProvider>
          <Providers>{children}</Providers>
        </StoreProvider>
      </body>
    </html>
  )
}
