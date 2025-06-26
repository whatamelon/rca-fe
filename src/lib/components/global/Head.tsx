'use client'

/**
 * ==============================================================================
 * @fileoverview Head
 * @desc Head 컴포넌트. <head>에 들어가는 script들을 관리.
 * @module layout/Head
 * ==============================================================================
 */
import Script from 'next/script'

export default function Head() {
  return (
    <>
      <Script src="/js/browser.js" />
      <Script
        id="light-mode-script"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            `,
        }}
      />
    </>
  )
}
