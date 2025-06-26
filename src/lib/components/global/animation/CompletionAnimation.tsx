/* eslint-disable react/no-array-index-key */

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/components/element/utils'

function SuccessIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      }}
      className="relative flex h-20 w-20 items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-primary/10 absolute inset-0 rounded-full"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 0.4,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <CheckCircle2 className="text-primary h-12 w-12" />
      </motion.div>
      <AnimatePresence>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: [0, Math.cos((i * Math.PI) / 4) * 40, Math.cos((i * Math.PI) / 4) * 60],
              y: [0, Math.sin((i * Math.PI) / 4) * 40, Math.sin((i * Math.PI) / 4) * 60],
            }}
            transition={{
              duration: 1.5,
              delay: 0.6 + i * 0.05,
              ease: 'easeOut',
              times: [0, 0.5, 1],
            }}
            className="bg-primary absolute h-2 w-2 rounded-full"
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 0.5 + 0.5, 0],
            x: ['50%', `${50 + (Math.random() * 60 - 30)}%`, `${50 + (Math.random() * 100 - 50)}%`],
            y: ['50%', `${50 + (Math.random() * 60 - 30)}%`, `${50 + (Math.random() * 100 - 50)}%`],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: 0.2 + Math.random() * 0.5,
            ease: 'easeOut',
          }}
          className="bg-primary/60 absolute h-2 w-2 rounded-full"
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 0.5 + 0.5, 0],
            x: ['50%', `${50 + (Math.random() * 80 - 40)}%`, `${50 + (Math.random() * 120 - 60)}%`],
            y: ['50%', `${50 + (Math.random() * 80 - 40)}%`, `${50 + (Math.random() * 120 - 60)}%`],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: 0.5 + Math.random() * 0.8,
            ease: 'easeOut',
          }}
        >
          <Sparkles className="text-primary h-3 w-3" />
        </motion.div>
      ))}
    </div>
  )
}

interface CompletionAnimationProps {
  title?: string
  description?: string
  className?: string
  onComplete?: () => void
}

export function CompletionAnimation({
  title = '생성 완료!',
  description = '성공적으로 생성되었습니다',
  className,
  onComplete,
}: CompletionAnimationProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 1500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm',
            className,
          )}
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border-border bg-background relative flex flex-col items-center justify-center rounded-lg border p-8 shadow-lg"
          >
            <SuccessIcon />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-foreground mt-6 text-2xl font-bold"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground mt-2 text-center"
            >
              {description}
            </motion.p>
            <Particles />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
