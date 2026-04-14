'use client'
import { useEffect } from 'react'

export default function NgfEditBridge() {
  useEffect(() => {
    let editMode = false

    // Inject hover/cursor styles for editable fields
    const style = document.createElement('style')
    style.id = 'ngf-edit-styles'
    style.textContent = `
      [data-ngf-edit="true"] [data-ngf-field] {
        cursor: pointer !important;
        outline: 2px solid transparent;
        border-radius: 3px;
        transition: outline-color 0.1s, background-color 0.1s;
      }
      [data-ngf-edit="true"] [data-ngf-field]:hover {
        outline-color: #3b82f6 !important;
        background-color: rgba(59,130,246,0.08) !important;
      }
      [data-ngf-edit="true"] a,
      [data-ngf-edit="true"] button {
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    const messageHandler = (e: MessageEvent) => {
      if (e.data?.type === 'setEditMode') {
        editMode = !!e.data.enabled
        document.documentElement.setAttribute('data-ngf-edit', editMode ? 'true' : 'false')
      }

      if (e.data?.type === 'contentUpdate' && e.data.content) {
        const content = e.data.content as Record<string, Record<string, string>>
        Object.entries(content).forEach(([section, fields]) => {
          if (typeof fields !== 'object' || fields === null) return
          Object.entries(fields).forEach(([field, value]) => {
            if (typeof value !== 'string') return
            const el = document.querySelector<HTMLElement>(
              `[data-ngf-field="${section}.${field}"]`
            )
            if (el) el.textContent = value
          })
        })
      }
    }

    // Capture phase so we intercept before any link/button default handlers
    const clickHandler = (e: MouseEvent) => {
      if (!editMode) return

      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      // Walk up the DOM to find the nearest element tagged as a field
      let target = e.target as HTMLElement | null
      while (target && target !== document.documentElement) {
        const attr = target.getAttribute('data-ngf-field')
        if (attr) {
          const dot = attr.indexOf('.')
          if (dot > -1) {
            window.parent.postMessage(
              {
                type: 'fieldClick',
                section: attr.substring(0, dot),
                field: attr.substring(dot + 1),
                currentValue: target.textContent?.trim() ?? '',
              },
              '*'
            )
          }
          return
        }
        target = target.parentElement
      }
      // Non-editable area — click is swallowed, no navigation
    }

    window.addEventListener('message', messageHandler)
    document.addEventListener('click', clickHandler, true) // true = capture phase

    return () => {
      window.removeEventListener('message', messageHandler)
      document.removeEventListener('click', clickHandler, true)
      document.getElementById('ngf-edit-styles')?.remove()
      document.documentElement.removeAttribute('data-ngf-edit')
    }
  }, [])

  return null
}
