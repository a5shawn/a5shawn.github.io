# Vue

## Vue2 生命周期函数

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed
- errorCaptured
- activated
- deactivated

## Vue3 生命周期函数

| 选项式 API    | 组合式 API              |
| ------------- | ----------------------- |
| beforeCreate  | （在 `setup()` 中执行） |
| created       | （在 `setup()` 中执行） |
| beforeMount   | `onBeforeMount`         |
| mounted       | `onMounted`             |
| beforeUpdate  | `onBeforeUpdate`        |
| updated       | `onUpdated`             |
| beforeUnmount | `onBeforeUnmount`       |
| unmounted     | `onUnmounted`           |
| errorCaptured | `onErrorCaptured`       |
| activated     | `onActivated`           |
| deactivated   | `onDeactivated`         |

## Vue 组件通信方式

### 父子组件

- 父 → 子：`props`
- 子 → 父：`emit`

### 非父子组件

- `provide` / `inject`
- `eventbus` / `mitt`

### 全局

- Vuex
- Pinia

## Vue 插槽

### 默认插槽

```vue
<button type="submit">
  <slot></slot>
</button>
```

### 具名插槽

```html
<!-- BaseLayout.vue -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```html
<BaseLayout>
  <template #header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

### 作用域插槽

```html
<!-- <MyComponent> template -->
<div>
  <slot :message="hello"></slot>
  <slot name="footer" :text="content" />
</div>
```

```html
<MyComponent>
  <!-- 使用显式的默认插槽 -->
  <template #default="{ message }">
    <p>{{ message }}</p>
  </template>

  <template #footer="{ text }">
    <p>{{ text }}</p>
  </template>
</MyComponent>
```

### 条件插槽

结合使用 $slots 属性与 v-if 来实现。

```html
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```
