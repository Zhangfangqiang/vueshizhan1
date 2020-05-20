/**
 * 验证错误的方法
 * @param el
 * @param modifiers
 * @param bindingValue
 */
function validate(el, modifiers, bindingValue) {
  bindingValue = bindingValue && typeof bindingValue === 'object' ? bindingValue : {}
  const value  = typeof el.value === 'string' ? el.value.trim() : ''
  const {title = '该项', error} = bindingValue
  let defaultError = ''

  if (modifiers.required && value === '') {
    defaultError = `${title}不能为空`
  } else if (bindingValue.target) {
    const target = document.querySelector(bindingValue.target)
    const targetValue = target ? target.value : null

    if (targetValue !== value) {
      defaultError = `输入的${title}不匹配`
    }
  } else if (bindingValue.regex) {
    try {
      if (!bindingValue.regex.test(value)) {
        defaultError = `${title}格式不正确`
      }
    } catch (e) {
    }
  }

  if (defaultError) {
    if (error === undefined) {
      showError(el, defaultError)
    } else {
      showError(el, error)
    }
  } else {
    showError(el)
  }
}

/**
 * 展示错误的方法
 * @param el
 * @param error
 */
function showError(el, error) {
  const parentElement = el.parentElement
  const errorElement = getErrorElement(el)

  if (error === undefined) {
    errorElement.style.display = 'none'
    parentElement.classList.remove('has-error')
  } else {
    errorElement.textContent = error
    errorElement.style.display = 'block'
    parentElement.classList.add('has-error')
  }
}

/**
 * 获取元素的方法
 * @param el
 * @returns {Element}
 */
function getErrorElement(el) {
  const parentElement = el.parentElement
  let errorElement = parentElement.querySelector('.help-block')

  if (!errorElement) {
    const tpl = `<span class="help-block"></span>`
    const fragment = document.createRange().createContextualFragment(tpl)

    parentElement.appendChild(fragment)
    errorElement = parentElement.querySelector('.help-block')
  }

  return errorElement
}

/**
 * bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
 * inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
 * update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
 * componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 * unbind：只调用一次，指令与元素解绑时调用。
 */
export default {
  /*绑定*/
  bind(el, binding, vnode) {
    /*value* 是 v- 绑定的值 arg是当前激活的事件 modifiers 是快捷验证的一些方法*/
    const { value, arg, modifiers } = binding
    /*定义事件类型 如果事件不存在 就是 change*/
    const eventType                 = ['change', 'blur', 'input'].indexOf(arg) !== -1 ? arg : 'change'

    /*定义一个默认事件处理器 ,可以改名*/
    const defaultHandler = () => {
      showError(el)
    }

    /*定义一个事件处理器 ,可以改名*/
    const handler = () => {
      validate(el, modifiers, value)
    }

    /*添加事件*/
    el.addEventListener('input', defaultHandler, false)
    el.addEventListener(eventType, handler, false)

    /*删除事件*/
    el.destroy = () => {
      el.removeEventListener('input', defaultHandler, false)
      el.removeEventListener(eventType, handler, false)
      el.destroy = null
    }
  },
  /*插入*/
  inserted(el, binding, vnode) {
    const {value, arg, modifiers} = binding
    /*指定当前一系列验证项的父级 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。*/
    const form                    = el.closest('[data-validator-form]')
    /*指定一个按钮来检查所有验证项*/
    const submitBtn               = form ? form.querySelector('[type=submit]') : null



    if (submitBtn) {
      const submitHandler = () => {
        validate(el, modifiers, value)

        const errors = form.querySelectorAll('.has-error')

        if (!errors.length) {
          submitBtn.canSubmit = true
        } else {
          submitBtn.canSubmit = false
        }
      }

      /*给按钮添加点击事件*/
      submitBtn.addEventListener('click', submitHandler, false)

      /*定义一个删除事件的方法*/
      el.destroySubmitBtn = () => {
        submitBtn.removeEventListener('click', submitHandler, false)
        el.destroySubmitBtn = null
      }
    }
  },
  unbind(el) {
    el.destroy()
    if (el.destroySubmitBtn) el.destroySubmitBtn()
  }
}
