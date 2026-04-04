# CSS

## BFC 是什么？

需要先提出CSS布局中遇到的问题：

- 外边距塌陷
- 子元素浮动导致父容器高度塌陷
- 浮动元素遮挡其他普通元素
- 等等

为了解决上面这些问题提出了BFC：

Web 页面中一个独立的渲染区域，这个区域内部元素的布局和渲染不会影响到外部元素，外部元素的布局和渲染也不会影响到该区域内部。简单来说，BFC就是一个'隔离的容器'。

**触发条件**：

- overflow：hidden ✅️

- float：left / right
- position：absolute / fixed
- display：inline-block / flow-root（现代标准推荐）
