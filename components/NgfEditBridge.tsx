'use client'
import { useEffect } from 'react'

export default function NgfEditBridge() {
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'setEditMode' && e.data.enabled) {
        document.documentElement.setAttribute('data-ngf-edit', 'true')

        document.querySelectorAll<HTMLElement>('[data-ngf-field]').forEach(el => {
          el.style.cursor = 'pointer'
          el.addEventListener('click', (evt) => {
            evt.preventDefault()
            evt.stopPropagation()
            const attr = el.getAttribute('data-ngf-field')!
            const dotIdx = attr.indexOf('.')
            const section = attr.substring(0, dotIdx)
            const field = attr.substring(dotIdx + 1)
            window.parent.postMessage(
              { type: 'fieldClick', section, field, currentValue: el.textContent ?? '' },
              '*'
            )
          })
        })
      }

      if (e.data?.type === 'contentUpdate' && e.data.content) {
        // Live-update editable elements without a page reload
        const content = e.data.content as Record<string, Record<string, string>>
        Object.entries(content).forEach(([section, fields]) => {
          if (typeof fields !== 'object') return
          Object.entries(fields).forEach(([field, value]) => {
            if (typeof value !== 'string') return
            const el = document.querySelector<HTMLElement>(`[data-ngf-field="${section}.${field}"]`)
            if (el) el.textContent = value
          })
        })
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return null
}
