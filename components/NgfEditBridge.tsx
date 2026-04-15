'use client'
import { useEffect } from 'react'

export default function NgfEditBridge() {
  useEffect(() => {
    let editMode = false

    // Inject styles - always-visible edit indicators + active edit mode styles
    const style = document.createElement('style')
    style.id = 'ngf-edit-styles'
    style.textContent = `
      [data-ngf-field] {
        outline: 1.5px dashed rgba(59,130,246,0.3) !important;
        border-radius: 3px;
        position: relative;
      }
      [data-ngf-field]::after {
        content: '\\2702';
        position: absolute;
        top: -8px;
        right: -8px;
        width: 18px;
        height: 18px;
        background: #3b82f6;
        color: white;
        font-size: 9px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 18px;
        text-align: center;
        opacity: 0.45;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.15s;
      }
      [data-ngf-edit="true"] [data-ngf-field]:hover {
        outline-color: #3b82f6 !important;
        background-color: rgba(59,130,246,0.06) !important;
        cursor: pointer !important;
      }
      [data-ngf-edit="true"] [data-ngf-field]:hover::after {
        opacity: 1;
      }
      [data-ngf-edit="true"] a,
      [data-ngf-edit="true"] button {
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    window.parent.postMessage({ type: 'ngfReady' }, '*')

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

    const clickHandler = (e: MouseEvent) => {
      if (!editMode) return
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
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
    }

    window.addEventListener('message', messageHandler)
    document.addEventListener('click', clickHandler, true)

    return () => {
      window.removeEventListener('message', messageHandler)
      document.removeEventListener('click', clickHandler, true)
      document.getElementById('ngf-edit-styles')?.remove()
      document.documentElement.removeAttribute('data-ngf-edit')
    }
  }, [])

  return null
}
