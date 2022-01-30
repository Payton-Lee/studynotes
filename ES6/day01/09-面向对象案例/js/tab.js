var _this
class Tab {
  constructor(id) {
    // 获取元素
    _this = this
    this.main = document.querySelector(id)
    this.add = this.main.querySelector('.tabadd')
    // li的父元素
    this.ul = this.main.querySelector('.fisrstnav ul:first-child')
    // section的父元素
    this.fsection = this.main.querySelector('.tabscon')
    this.init()
  }
  init() {
    this.updateNode()
    // init 初始化操作，让相关的元素绑定事件
    this.add.onclick = this.addTab
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
      this.remove[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
      this.sections[i].ondblclick = this.editTab
    }
  }
  // 获取所有的li 和 section
  updateNode() {
    // 因为动态添加元素，需要重新获取所有的动态元素
    this.remove = this.main.querySelectorAll('.icon-guanbi')
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section')
    this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
  }
  // 1、切换功能
  toggleTab() {
    // console.log(this.index);
    // 代码复用前的选项:
    // _this.clearClass()
    // 先清除当前li的class
    _this.clearClassPlus(_this.lis)
    // 然后清除sections的class
    _this.clearClassPlus(_this.sections)
    this.className = 'liactive'
    _this.sections[this.index].className = 'conactive'
  }
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.sections[i].className = ''
    }
  }
  // 以下是代码复用的选项
  clearClassPlus(arg) {
    for (var i = 0; i < arg.length; i++) {
      arg[i].className = ''
    }
  }
  // 2、添加功能
  addTab() {
    // 先清除当前li的class
    _this.clearClassPlus(_this.lis)
    // 然后清除sections的class
    _this.clearClassPlus(_this.sections)
    // 1、创建li元素和section元素
    var random = Math.random()
    var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
    var section = '<section class="conactive">测试' + random + '</section>'
    // 2、把这两个元素追加到对应的父元素里面
    // insertAdjacentHTML 方法将指定的文本解析为 Element 元素，并将结果节点插入到DOM树中的指定位置。
    // 'beforebegin'：元素自身的前面。
    // 'afterbegin'：插入元素内部的第一个子节点之前。
    // 'beforeend'：插入元素内部的最后一个子节点之后。
    // 'afterend'：元素自身的后面。
    _this.ul.insertAdjacentHTML('beforeend', li)
    _this.fsection.insertAdjacentHTML('beforeend', section)
    _this.init()
  }
  // 3、删除功能
  removeTab(e) {
    e.stopPropagation() // 阻止冒泡，防止触发li 的事件切换
    var index = this.parentNode.index
    console.log(index);
    // 根据索引号删除对应的 li 和 section remove()方法可以直接删除指定的元素
    _this.lis[index].remove()
    _this.sections[index].remove()
    // 重新和获取对应的元素 li 和 section
    _this.init()
    // 当删除的不是选中状态的 li， 原来的选中状态 li 保持不变, 这里的选出来为真，证明有li是处于被选中状态的，不需要执行切换选中状态的操作
    if (document.querySelector('.liactive')) return
    // 当我们删除了选中状态的这个li的是ihou，让它的前一个li处于选定状态
    index--
    // 手动调用点击事件，不需要鼠标触发
    _this.lis[index] && _this.lis[index].click()
    // 判断元素是否存在，在就执行点击，不在就不执行点击
  }
  // 4、修改功能
  editTab(e) {
    e.stopPropagation()
    var str = this.innerHTML
    // 双击禁止选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    // alert(111)
    this.innerHTML = '<input type="text" />'
    var input = this.children[0]
    input.value = str
    input.select() // 文本框里面的文字处于选中状态
    // 离开文本框，就把文本框里面的值给span
    input.onblur = function () {
      this.parentNode.innerHTML = this.value
    }
    // 按下回车也可以把文本框里面的值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        // 手动调用表单失去焦点事件，不需要鼠标调用操作
        this.blur()
      }
    }
  }
}
new Tab('#tab')