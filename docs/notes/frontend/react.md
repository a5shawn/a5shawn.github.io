# React

## Hooks

| Hook                                 | 用途                    |
| ------------------------------------ | ----------------------- |
| `useState`                           | 状态管理                |
| `useEffect`                          | 副作用处理              |
| `useContext`                         | 访问 Context            |
| `useReducer`                         | 复杂状态逻辑            |
| `useCallback`                        | 缓存函数                |
| `useMemo`                            | 缓存计算结果            |
| `useRef`                             | 引用 DOM 或可变值       |
| `useImperativeHandle`                | 自定义 ref 行为         |
| `useLayoutEffect`                    | 同步 DOM 副作用         |
| `useDebugValue`                      | DevTools 调试           |
| `useId`                              | 生成唯一 ID（SSR 安全） |
| `useTransition` / `useDeferredValue` | 并发渲染优化            |
| `useSyncExternalStore`               | 外部状态订阅            |
| `useInsertionEffect`                 | 样式注入                |

## 生命周期

### 类组件

1. constructor
2. componentDidMount
3. componentDidUpdate
4. componentWillUnmount

> getDerivedStateFromProps：在组件挂载和更新前调用

### 函数式组件

- `useEffect(() => {}, [])` ≈ `componentDidMount`
- `useEffect(() => { return () => {} }, [])` ≈ `componentWillUnmount`
- `useEffect(() => {})`（无依赖或带依赖）≈ `componentDidUpdate`

## 组件通信

### 父子组件

- 父 → 子：`Props`
- 子 → 父：`Callback`

### 非父子组件

- `Context`

### 全局

- Redux

## 虚拟 DOM

虚拟 DOM 是 React 用 JavaScript 对象模拟真实 DOM 的一种策略，通过“比较差异 + 批量更新”的方式，高效、安全地同步 UI 状态，让开发者专注于数据驱动视图，而不必操心底层 DOM 操作。

### 如何工作

1. 初始渲染

   React 根据组件生成一棵虚拟 DOM 树，并将其渲染为真实 DOM 显示在页面上。

2. 状态变更触发重新渲染

   当 state 或 props 改变时，React 会重新生成一棵新的虚拟 DOM 树。

3. Diffing + 更新真实 DOM

   React 将新旧两棵虚拟 DOM 树进行对比（Diffing）；
   找出最小差异（比如某个文本变了、某个元素被删除了）；
   只将这些差异批量应用到真实 DOM 上，而不是全量替换。

> React 的 Diff 算法通过 “同层比较 + 类型判断 + key 识别” 三大策略，找出最小更新路径，高效同步虚拟 DOM 到真实 DOM。
