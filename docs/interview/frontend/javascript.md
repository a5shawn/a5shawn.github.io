# JavaScript

## 基本数据类型和引用数据类型，区别是什么？

### 基本数据类型

- String
- Number
- Boolean
- Null
- Undefined
- Symbol

### 引用数据类型

- Object
- Array
- Function
- Date
- Map
- Set

### 区别

1. 存储方式
   - 基本数据类型：栈内存
   - 引用数据类型：堆内存
2. 赋值方式
   - 基本数据类型：值拷贝
   - 引用数据类型：引用拷贝

### 延伸

- 判断数据类型

- 深拷贝 vs 浅拷贝

## 怎么判断基本数据类型和引用数据类型

- typeof：基本数据类型
- instanceof：基于原型链判断
- Object.prototype.toString.call()：通用 ✅️

### 最佳实践

```js
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
// 使用示例
console.log(getType(123)); // "number"
console.log(getType("abc")); // "string"
console.log(getType(null)); // "null"
console.log(getType([])); // "array"
console.log(getType(new Date())); // "date"
```

## 说说深浅拷贝有哪些，如何实现深拷贝？

### 浅拷贝

- 直接赋值
- Object.assign
- 展开运算符（...）
- Array.slice

### 深拷贝

- JSON序列化

  ```js
  const deepCopy = JSON.parse(JSON.stringify(obj));
  ```

- Lodash.cloneDeep

  ```js
  import cloneDeep from "lodash/cloneDeep";
  const cloned = cloneDeep(original);
  ```

- 递归实现 ✅️

  ```js
  function deepClone(obj) {
    // 基本数据类型直接返回
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // 创建新对象（数组或普通对象）
    const clone = Array.isArray(obj) ? [] : {};

    // 递归复制属性
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key]);
      }
    }

    return clone;
  }
  ```

## null 和 undefined 的区别

### undefined

表示未定义，系统默认值

- 变量声明未赋值
- 访问对象不存在的属性
- 函数参数未传递
- 函数没有返回值

### null

表示空值，主动设置的值

## 什么是闭包？应用场景有哪些？

能够访问另一个函数作用域中的变量的函数。

### 形成条件

1. 函数嵌套
2. 内部函数引用外部函数变量
3. 内部函数被返回或当作回调函数

### 应用场景

- 模块化开发
  - ES6 之前使用闭包和立即执行函数实现

- 防抖和节流
- 缓存函数
- 柯里化

### 注意事项

- 性能影响
- 内存泄漏

> 闭包的本质就是保存了作用域链的引用。

## 说说原型和原型链

JS 中每个对象都有一个原型（Prototype），原型也是一个对象，所以原型也有自己的原型，就这样一层层向上，直到一个原型的对象为 null，这就是原型链。

原型链的好处就是**实现继承**。

## 说说 JS 事件循环

事件循环是 JS 中处理异步操作的核心机制，它使得JS能在单线程环境下实现“非阻塞”的异步操作。

### 核心组成

1. **调用栈**：同步代码按顺序执行的地方
2. **任务队列**：异步任务完成后，其回调函数会进入队列中等待。

   其中队列分为两种：
   - 宏任务队列：`setTimeout`、`setInterval`、I/O 、UI渲染
   - 微任务队列：`Promise`、`async/await`、`nextTick`

     > 微任务比宏任务优先级高，会在宏任务之前执行

3. **事件循环**：不断检查调用栈和任务队列的调度器。

### 基本流程

1. 执行同步代码，遇到异步任务放到任务队列中，继续执行同步代码
2. 同步代码执行完（调用栈空），先执行所有微任务
3. 执行一个宏任务，然后再执行所有微任务
4. 重复步骤 3，直到所有任务完成

## 什么是函数式编程

函数式编程是一种以**纯函数**，**不可变数据**和**函数组合**为核心的编程范式，关注于数据**“转换”**而非**“改变“**。

**纯函数**：相同输入 → 相同输出，无副作用。

**不可变数据**：数据一旦创建就不能被修改，操作数据时返回新数据，不修改原数据。

**函数组合**：一等函数（函数可以作为参数传递，可以作为返回值，可以存储在变量中）和高阶函数（参数或返回值为函数的函数）

## 说说防抖和节流及其应用场景

**防抖**：连续触发事件后，只执行最后一次，主要用于**输入框实时查询**，**按钮重复点击**。

**节流**：固定时间间隔内只执行一次，主要用于**页面滚动**，**窗口大小调整**。

## 跨域及解决办法间间隔内只执行一次，主要用于**页面滚动**，**窗口大小调整**。

## 跨域及解决办法

## axios 和 ajax 有什么区别

## 如何保证多个请求完成？怎么定位失败的是哪个请求？如何取消请求？

## axios 请求 try-catch 到的错误是什么
