import exp from 'constants'
import { isServer } from './is'
const ieVersion = isServer ? 0 : Number((document as any).documentMode)
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

export interface ViewportOffsetResult {
  left: number
  top: number
  right: number
  bottom: number
  rightIncludeBody: number
  bottomIncludeBody: number
}

/* istanbul ignore next */
const trim = function (string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/* istanbul ignore next */
const camelCase = function (name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, __, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/* istanbul ignore next */
export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/* istanbul ignore next */
export function addClass(el: Element, cls: string) {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export function toggleClass(el, className) {
  if (!el || !className) return
  if (el.classList) {
    el.classList.toggle(className)
  } else {
    const classes = el.className.split(' ')
    const existingIndex = classes.indexOf(className)

    if (existingIndex >= 0) classes.splice(existingIndex, 1)
    else classes.push(className)

    el.className = classes.join(' ')
  }
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}

/**
 * 获取当前元素的left、top偏移
 *   left：元素最左侧距离文档左侧的距离
 *   top:元素最顶端距离文档顶端的距离
 *   right:元素最右侧距离文档右侧的距离
 *   bottom：元素最底端距离文档底端的距离
 *   rightIncludeBody：元素最左侧距离文档右侧的距离
 *   bottomIncludeBody：元素最底端距离文档最底部的距离
 *
 * @description:
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement

  const docScrollLeft = doc.scrollLeft
  const docScrollTop = doc.scrollTop
  const docClientLeft = doc.clientLeft
  const docClientTop = doc.clientTop

  const pageXOffset = window.pageXOffset
  const pageYOffset = window.pageYOffset

  const box = getBoundingClientRect(element)

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0)
  const offsetLeft = retLeft + pageXOffset
  const offsetTop = rectTop + pageYOffset

  const left = offsetLeft - scrollLeft
  const top = offsetTop - scrollTop

  const clientWidth = window.document.documentElement.clientWidth
  const clientHeight = window.document.documentElement.clientHeight
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top
  }
}

/* istanbul ignore next */
export const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export const off = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: any
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export const once = function (el: HTMLElement, event: string, fn: EventListener): void {
  const listener = function (this: any, ...args: unknown[]) {
    if (fn) {
      // @ts-ignore
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

/* istanbul ignore next */
export const getStyle =
  ieVersion < 9
    ? function (element: Element | any, styleName: string) {
      if (isServer) return
      if (!element || !styleName) return null
      styleName = camelCase(styleName)
      if (styleName === 'float') {
        styleName = 'styleFloat'
      }
      try {
        switch (styleName) {
          case 'opacity':
            try {
              return element.filters.item('alpha').opacity / 100
            } catch (e) {
              return 1.0
            }
          default:
            return element.style[styleName] || element.currentStyle
              ? element.currentStyle[styleName]
              : null
        }
      } catch (e) {
        return element.style[styleName]
      }
    }
    : function (element: Element | any, styleName: string) {
      if (isServer) return
      if (!element || !styleName) return null
      styleName = camelCase(styleName)
      if (styleName === 'float') {
        styleName = 'cssFloat'
      }
      try {
        const computed = (document as any).defaultView.getComputedStyle(element, '')
        return element.style[styleName] || computed ? computed[styleName] : null
      } catch (e) {
        return element.style[styleName]
      }
    }

/* istanbul ignore next */
export function setStyle(element: Element | any, styleName: any, value: any) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
}

/* istanbul ignore next */
export const isScroll = (el: Element, vertical: any) => {
  if (isServer) return

  const determinedDirection = vertical !== null || vertical !== undefined
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow')

  return overflow.match(/(scroll|auto)/)
}

/* istanbul ignore next */
export const getScrollContainer = (el: Element, vertical?: any) => {
  if (isServer) return

  let parent: any = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, vertical)) {
      return parent
    }
    parent = parent.parentNode
  }

  return parent
}

/* istanbul ignore next */
export const isInContainer = (el: Element, container: any) => {
  if (isServer || !el || !container) return false

  const elRect = el.getBoundingClientRect()
  let containerRect

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    }
  } else {
    containerRect = container.getBoundingClientRect()
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  )
}

/* istanbul ignore next */
export const getOffsetTop = (el: Element) => {
  let offset = 0
  let parent = el
  while (parent) {
    offset += parent.offsetTop
    parent = parent.offsetParent as Element
  }
  return offset
}

// 铺满全屏
export const setContentFull = (el: Element) => {
  const elOffsetTop = getOffsetTop(el)
  el.style.height = `calc(100vh - ${elOffsetTop}px - var(--app-footer-height) - var(--app-content-padding))`
}

interface FlipOptions {
  duration?: number
}

/**
 * Flip 动画思想 first last invert 反转 first-last play
 * use: new Flip(elements, { duration: 1000 }) 
 * @param elements
 * 改变元素位置后
 * f.play
 */
export class Flip {
  private elements: HTMLElement[]
  private options: FlipOptions

  constructor(elements: HTMLElement[], options?: FlipOptions) {
    this.elements = elements
    this.options = options || {}

    this.init()
  }

  private init(): void {
    if (!this.elements || this.elements.length === 0) {
      return
    }

    for (const element of this.elements) {
      const rects = element.getBoundingClientRect()
      // 可以在这里收集first一开始的位置
      element.setAttribute("data-custom-y", rects.y);
    }
  }

  public play(): void {
    if (!this.elements || this.elements.length === 0) {
      return
    }

    // const { duration = 1000 } = this.options
    // const easeInOutCubic = (t: number): number =>
    //   t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    // 改变完位置可以在这里invert 
    for (let index = 0; index < this.elements.length; index++) {
      const element = this.elements[index];
      const rects = element.getBoundingClientRect()
      const Y = element.getAttribute("data-custom-y")
      const { y: last } = rects
   
      const invert = Y - last
      element.animate([{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }], {
        duration: 400,
        easing: 'cubic-bezier(0.68, -0.55, 0.27, 0.65)'
      })
    }
  }
}