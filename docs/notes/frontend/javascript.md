# JavaScript

## 作用域和作用域链

### 作用域

变量和函数的可访问范围。

- 全局作用域
- 函数作用域
- 块级作用域

### 作用域链

查找变量时，沿着嵌套作用域逐层向上搜索的路径。

它是一个链式结构，从当前作用域开始，一直追溯到全局作用域。

如果找不到，抛出 ReferenceError。

## 原型和原型链

JS 中每个对象都有一个原型（Prototype），原型也是一个对象，所以原型也有自己的原型，就这样一层层向上，直到一个原型的对象为 null，这就是原型链。

原型链的好处就是**实现继承**和代码复用。

## new 操作符的实现原理

1. 创建一个新对象，并将新对象的原型指向构造函数的原型。
2. 执行构造函数，并将构造的函数的 `this` 绑定到新对象上。
3. 判断构造函数返回值，如果返回一个非空对象（包括函数），则返回非空对象；否则返回新对象。

```js
function myNew(constructor, ...args) {
  // 1. 创建一个继承自 constructor.prototype 的新对象
  const obj = Object.create(constructor.prototype);

  // 2. 执行构造函数，并将 this 绑定到新对象
  const result = constructor.apply(obj, args);

  // 3. 判断返回值：如果是对象/函数，则返回它；否则返回新对象
  return (result !== null && typeof result === "object") ||
    typeof result === "function"
    ? result
    : obj;
}
```

## 闭包

闭包是一个函数，它记住了其创建时的词法作用域，即使该函数在其作用域之外执行，也能访问其外部函数的变量。

### 核心要素

- 函数嵌套：内部函数引用了外部函数的变量。
- 作用域保留：外部函数执行完毕后，内部函数依然持有对外部变量的引用，导致这些变量不会被垃圾回收。

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer(); // outer 执行完毕
counter(); // 1
counter(); // 2
// count 变量依然存活，被 inner 函数“闭包”住了
```

### 应用场景

#### 数据私有化

利用闭包创建私有变量，避免全局污染，实现封装。

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 私有变量

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("余额不足");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
console.log(account.balance); // undefined，无法直接访问
```

#### 函数柯里化

柯里化是将多参数函数转换为一系列单参数函数的技术，常用于参数复用和延迟计算。

```js
// 通用柯里化函数
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
```

#### 防抖节流

闭包用于保存定时器或状态变量。

```js
// 防抖：n 秒内只执行最后一次
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流：n 秒内只执行一次
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

#### 函数记忆

缓存计算结果，提升性能。

```js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("从缓存读取");
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const fib = memoize(function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

fib(10); // 计算并缓存
fib(10); // 直接从缓存读取
```

### 注意事项

- 性能开销：创建闭包比简单函数消耗更多资源。
- 内存泄漏：闭包会阻止变量被回收，过度使用可能导致内存泄漏。

> 闭包的本质就是保存了作用域链的引用。

## 事件循环

事件循环是 JS 中一种处理异步任务的机制。

### 核心组成

1. **调用栈**：同步代码按顺序执行的地方
2. **任务队列**：异步任务完成后，其回调函数会进入队列中等待。

   其中队列分为两种：
   - 宏任务队列：`setTimeout`、`setInterval`、I/O 操作、整个脚本的执行
   - 微任务队列：`Promise`、`async/await`、`nextTick`

3. **事件循环**：不断检查调用栈和任务队列的调度器。

### 基本流程

1. 执行同步代码，遇到异步任务放到任务队列中，继续执行同步代码
2. 同步代码执行完（调用栈空），先执行所有微任务
3. 执行一个宏任务，然后再执行所有微任务
4. 重复步骤 3，直到所有任务完成

## nextTick

`nextTick` 是 Vue 中的一个异步工具函数，用于**在下次 DOM 更新结束后执行延迟回调**。它的核心作用就是：**确保在修改数据后，能够访问到更新后的 DOM**。

为什么需要 nextTick？因为 Vue 的响应式系统是异步更新的。

## Promise
