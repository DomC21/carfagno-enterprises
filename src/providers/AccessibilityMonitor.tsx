import * as React from 'react'
import { useEffect, useRef } from 'react'

interface AccessibilityIssue {
  type: 'error' | 'warning'
  message: string
  element: string
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
}

export function useAccessibilityMonitor() {
  const issuesRef = useRef<AccessibilityIssue[]>([])

  useEffect(() => {
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let lastLevel = 0
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1])
      if (level - lastLevel > 1) {
        issuesRef.current.push({
          type: 'error',
          message: `Skipped heading level: from h${lastLevel} to h${level}`,
          element: heading.tagName,
          impact: 'serious'
        })
      }
      lastLevel = level
    })

    // Check for images without alt text
    const images = document.querySelectorAll('img')
    images.forEach((img) => {
      if (!img.hasAttribute('alt')) {
        issuesRef.current.push({
          type: 'error',
          message: 'Image missing alt text',
          element: 'img',
          impact: 'critical'
        })
      }
    })

    // Check for proper ARIA usage
    const ariaElements = document.querySelectorAll('[aria-*]')
    ariaElements.forEach((el) => {
      const ariaLabel = el.getAttribute('aria-label')
      const ariaLabelledBy = el.getAttribute('aria-labelledby')
      if (!ariaLabel && !ariaLabelledBy) {
        issuesRef.current.push({
          type: 'warning',
          message: 'ARIA attribute used without label',
          element: el.tagName,
          impact: 'moderate'
        })
      }
    })

    // Check for keyboard focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    focusableElements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      if (styles.outline === 'none' || styles.outlineStyle === 'none') {
        issuesRef.current.push({
          type: 'warning',
          message: 'Element may be missing visible focus indicator',
          element: el.tagName,
          impact: 'serious'
        })
      }
    })

    // Check color contrast
    const textElements = document.querySelectorAll('p, span, div, a, button')
    textElements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      const backgroundColor = styles.backgroundColor
      const color = styles.color
      // Simple check - in reality would use WCAG color contrast algorithm
      if (backgroundColor === 'transparent' || color === 'transparent') {
        issuesRef.current.push({
          type: 'warning',
          message: 'Potential color contrast issue',
          element: el.tagName,
          impact: 'moderate'
        })
      }
    })

    // Log issues
    if (issuesRef.current.length > 0) {
      console.group('Accessibility Issues')
      issuesRef.current.forEach((issue) => {
        const logMethod = issue.type === 'error' ? console.error : console.warn
        logMethod(`${issue.impact.toUpperCase()}: ${issue.message} (${issue.element})`)
      })
      console.groupEnd()
    }

    // Monitor keyboard navigation
    let lastTabTime = 0
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const now = performance.now()
        if (lastTabTime && (now - lastTabTime > 5000)) {
          console.warn('Potential keyboard trap detected - long time between Tab presses')
        }
        lastTabTime = now
      }
    })

    // Monitor focus management
    let lastFocusedElement: Element | null = null
    document.addEventListener('focus', (e) => {
      const target = e.target as Element
      if (lastFocusedElement) {
        const distance = Math.abs(
          lastFocusedElement.getBoundingClientRect().top -
          target.getBoundingClientRect().top
        )
        if (distance > window.innerHeight) {
          console.warn('Focus moved too far - may disorient keyboard users')
        }
      }
      lastFocusedElement = target
    }, true)

    return () => {
      document.removeEventListener('keydown', () => {})
      document.removeEventListener('focus', () => {}, true)
    }
  }, [])

  return {
    getIssues: () => issuesRef.current,
    clearIssues: () => {
      issuesRef.current = []
    }
  }
}
