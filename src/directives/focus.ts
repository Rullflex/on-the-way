import { DirectiveBinding } from 'vue';

export const vFocus = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value !== false) {
      el.focus();
    }
  }
};
