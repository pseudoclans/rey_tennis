"use client"

import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 800,
  direction = 'up',
  distance = 50,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold, hasAnimated])

  const getTransformStyle = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`
        case 'down':
          return `translateY(-${distance}px)`
        case 'left':
          return `translateX(${distance}px)`
        case 'right':
          return `translateX(-${distance}px)`
        case 'fade':
          return 'none'
        default:
          return `translateY(${distance}px)`
      }
    }
    return 'none'
  }

  const getOpacity = () => {
    if (direction === 'fade') {
      return isVisible ? 1 : 0
    }
    return 1
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: getOpacity(),
        transform: getTransformStyle(),
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}

// Convenience components for different directions
export function FadeIn({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="fade" {...props}>{children}</ScrollReveal>
}

export function SlideUp({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="up" {...props}>{children}</ScrollReveal>
}

export function SlideDown({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="down" {...props}>{children}</ScrollReveal>
}

export function SlideLeft({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="left" {...props}>{children}</ScrollReveal>
}

export function SlideRight({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
  return <ScrollReveal direction="right" {...props}>{children}</ScrollReveal>
} 