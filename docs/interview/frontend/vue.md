# Vue

## Vue3 和 Vue2 的区别

**响应式系统**：`Object.defineProperty` / `Proxy`

**API风格**：选项式 API / 组合式 API

**TypeScript支持**：Vue2 需配置，Vue3 原生支持

**性能优化**：体积减小、渲染性能提升、优化虚拟 DOM 算法、更好的支持 Tree Shaking

## Vue3 比 Vue2 有什么优势

## Vue 响应式原理

## Vue3 的生命周期有哪些

## 父子组件生命周期执行顺序

核心规律：**父先初始化，子先完成挂载；父先触发销毁，子先完成销毁**

父 beforeCreate → 父 created → 父 beforeMount
→ 子 beforeCreate → 子 created → 子 beforeMount
→ 子 mounted
→ 父 mounted

父 beforeUpdate → 子 beforeUpdate
→ 子 updated
→ 父 updated

父 beforeDestroy（Vue2）/ beforeUnmount（Vue3）
→ 子 beforeDestroy（Vue2）/ beforeUnmount（Vue3）
→ 子 destroyed（Vue2）/ unmounted（Vue3）
→ 父 destroyed（Vue2）/ unmounted（Vue3）

## Vue 插槽有哪些

- 默认插槽

- 具名插槽

- 作用域插槽

## Vue3 组件的通信方式有哪些

## 父组件怎么给孙子组件传值

## Vuex 五个核心是什么

## watch 和 watchEffect 区别

## 二次封装过哪些组件，怎么封装的（透传）

## 组件细分太多会有什么问题

## Vue3 定义响应式有哪些方式

## EventBus 为什么能实现通信？emit 两个相同的事件会有什么问题？

## Vue3 Proxy 原理实现

## Vue3 组合式函数及应用场景，和 mixin 的异同

## token 过期怎么解决？无感刷新怎么实现？

## nextTick 是什么任务

## Pinia 和 Vuex 有什么区别

## ref 和 reactive 有什么区别

## 虚拟DOM了解吗
