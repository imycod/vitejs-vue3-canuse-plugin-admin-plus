import type { App, Directive, DirectiveBinding } from 'vue'

function disabled(el: Element, binding: DirectiveBinding) {
  console.log({ el, binding })
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  disabled(el, binding)
}

const disabledDirective: Directive = {
  mounted,
}
export const setupDisabledDirective = (app: App<Element>) => {
  app.directive('disabled', disabledDirective)
}
