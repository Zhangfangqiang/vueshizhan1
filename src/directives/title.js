/**
 * 展示标题的方法
 * @param el
 * @param title
 */
function showTitle(el, title) {
  const popover      = getPopover()   /*获取弹框*/
  const popoverStyle = popover.style  /*定义弹框样式*/

  /*判断元素中title是否存在*/
  if (title === undefined) {
    popoverStyle.display = 'none'
  } else {
    const elRect          = el.getBoundingClientRect()                                                      /*该元素的 CSS 边框大小。返回的结果是包含完整元素的最小矩形，并且拥有left, top, right, bottom, x, y, width, 和 height这几个以像素为单位的只读属性用于描述整个边框*/
    const elComputedStyle = window.getComputedStyle(el, null)                                     /*getComputedStyle 和 element.style 的相同点就是二者返回的都是 CSSStyleDeclaration 对象，取相应属性值得时候都是采用的 CSS 驼峰式写法，均需要注意 float 属性*/
    const rightOffset     = parseInt(elComputedStyle.getPropertyValue('padding-right')) || 0
    const topOffset       = parseInt(elComputedStyle.getPropertyValue('padding-top')) || 0

    popoverStyle.visibility = 'hidden'
    popoverStyle.display    = 'block'
    popover.querySelector('.popover-content').textContent = title
    popoverStyle.left       = elRect.left - popover.offsetWidth / 2 + (el.offsetWidth - rightOffset) / 2 + 'px'
    popoverStyle.top        = elRect.top - popover.offsetHeight + topOffset + 'px'
    popoverStyle.display    = 'block'
    popoverStyle.visibility = 'visible'
  }
}

/**
 * 获取弹框的方法
 * @returns {Element}
 */
function getPopover() {
  let popover = document.querySelector('.title-popover')

  if (!popover) {
    const tpl = `
      <div class="popover title-popover top fade in" style="position:fixed;">
        <div class="arrow"></div>
        <div class="popover-content"></div>
      </div>
    `
    const fragment = document.createRange().createContextualFragment(tpl)

    document.body.appendChild(fragment)
    popover = document.querySelector('.title-popover')
  }

  return popover
}

/**
 * bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
 * inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
 * update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
 * componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 * unbind：只调用一次，指令与元素解绑时调用。
 */
export default {
  bind(el, binding, vnode) {
    /*定义了一个数组*/
    const events  = ['mouseenter', 'mouseleave', 'click']
    /*定义了一个事件处理器*/
    const handler = (event) => {
      if (event.type === 'mouseenter') {
        showTitle(el, binding.value)
      } else {
        showTitle()
      }
    }

    /**
     * 定义的事件数组开始循环
     */
    events.forEach((event) => {
      /*绑定事件*/
      el.addEventListener(event, handler, false)
    })

    /*在 el 元素上添加一个属性，以在其他钩子进行访问*/
    el.destroy = () => {
      events.forEach((event) => {
        el.removeEventListener(event, handler, false)
      })
      el.destroy = null
    }
  },
  /*移除事件监听和数据绑定*/
  unbind(el) {
    el.destroy()
  }
}
