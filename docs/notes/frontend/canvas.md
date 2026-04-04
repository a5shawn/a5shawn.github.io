# Canvas

> 所有示例基于 `2D 渲染上下文`（`getContext('2d')`），适用于 Web 游戏、数据可视化、图像处理等场景。

## 基础设置

### 1. 创建 `<canvas>` 元素

```html
<canvas id="myCanvas" width="500" height="300">
  您的浏览器不支持 Canvas。
</canvas>
```

> ⚠️ 使用 `width`/`height` 属性（非 CSS）设置画布尺寸，避免拉伸变形。

### 2. 获取绘图上下文

```js
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); // 返回 CanvasRenderingContext2D 对象
```

## 绘制基本图形

### 1. 矩形

| 方法                     | 说明               |
| ------------------------ | ------------------ |
| `fillRect(x, y, w, h)`   | 填充矩形           |
| `strokeRect(x, y, w, h)` | 描边矩形           |
| `clearRect(x, y, w, h)`  | 清除区域（变透明） |

```js
ctx.fillStyle = "skyblue";
ctx.fillRect(10, 10, 100, 60);

ctx.strokeStyle = "red";
ctx.lineWidth = 2;
ctx.strokeRect(120, 10, 100, 60);
```

## 路径绘制

> 所有复杂图形（线、圆、多边形、曲线）都通过路径实现。

### 1. 路径基本流程

```js
ctx.beginPath(); // 开始新路径（清空之前路径）
ctx.moveTo(50, 50); // 移动画笔到起点
ctx.lineTo(150, 50); // 画直线到 (150,50)
ctx.lineTo(100, 150); // 再画到 (100,150)
ctx.closePath(); // 自动连线回起点（可选）
ctx.stroke(); // 描边（或 fill() 填充）
```

### 2. 绘制圆形

```js
ctx.beginPath();
// arc(x, y, radius, startAngle, endAngle, anticlockwise)
ctx.arc(200, 100, 50, 0, Math.PI * 2); // 完整圆
ctx.fillStyle = "green";
ctx.fill();
```

### 3. 贝塞尔曲线

- **二次贝塞尔**：`quadraticCurveTo(cpx, cpy, x, y)`
- **三次贝塞尔**：`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

```js
// 三次贝塞尔示例
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.bezierCurveTo(100, 100, 200, 300, 250, 200);
ctx.stroke();
```

## 文本绘制

```js
ctx.font = "bold 24px Arial"; // 字体样式
ctx.textAlign = "center"; // 水平对齐：left/center/right
ctx.textBaseline = "middle"; // 垂直基线：top/middle/bottom

ctx.fillStyle = "black";
ctx.fillText("Hello Canvas", 250, 250); // 填充文本

ctx.strokeStyle = "blue";
ctx.strokeText("Outline", 250, 280); // 描边文本
```

> 🔍 测量文本宽度：

```js
const width = ctx.measureText("Test").width;
```

## 图像操作

### 1. 绘制图片

```js
const img = new Image();
img.onload = () => {
  // 原尺寸绘制
  ctx.drawImage(img, 0, 0);

  // 缩放绘制
  ctx.drawImage(img, 100, 100, 80, 60);

  // 裁剪+缩放（源区域 → 目标区域）
  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};
img.src = "image.jpg";
```

### 2. 像素级操作

```js
// 获取像素数据
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data; // Uint8ClampedArray [r,g,b,a, ...]

// 修改后写回
ctx.putImageData(imageData, 0, 0);
```

## 样式与效果

### 1. 颜色与透明度

```js
ctx.fillStyle = "#ff5733"; // HEX
ctx.fillStyle = "rgba(255,0,0,0.5)"; // RGBA
ctx.globalAlpha = 0.7; // 全局透明度（0~1）
```

### 2. 线条样式

```js
ctx.lineWidth = 5;
ctx.lineCap = "round"; // 线端形状：butt（默认）/ round / square
ctx.lineJoin = "round"; // 连接处：miter / round / bevel
ctx.setLineDash([10, 5]); // 虚线模式 [实长, 间隔]
```

### 3. 阴影

```js
ctx.shadowColor = "rgba(0,0,0,0.5)";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 3;
ctx.shadowOffsetY = 3;
ctx.fillRect(50, 200, 100, 50);
```

## 渐变

### 1. 线性渐变

```js
const grad = ctx.createLinearGradient(0, 0, 200, 0);
grad.addColorStop(0, "red");
grad.addColorStop(1, "blue");
ctx.fillStyle = grad;
ctx.fillRect(0, 250, 200, 30);
```

### 2. 径向渐变

```js
const radial = ctx.createRadialGradient(100, 100, 10, 100, 100, 80);
radial.addColorStop(0, "white");
radial.addColorStop(1, "black");
ctx.fillStyle = radial;
ctx.fillRect(0, 290, 200, 100);
```

### 3. 锥形渐变

```js
const conicGradient = ctx.createConicGradient(0, 600, 100);
conicGradient.addColorStop(0, "red");
conicGradient.addColorStop(0.5, "green");
conicGradient.addColorStop(1, "blue");
ctx.fillStyle = conicGradient;
ctx.beginPath();
ctx.rect(520, 20, 160, 160);
ctx.fill();
```

## 坐标变换

| 方法                   | 作用              |
| ---------------------- | ----------------- |
| `translate(x, y)`      | 平移原点          |
| `rotate(angle)`        | 旋转（弧度）      |
| `scale(x, y)`          | 缩放              |
| `save()` / `restore()` | 保存/恢复绘图状态 |

```js
ctx.save();
ctx.translate(250, 150); // 将原点移到中心
ctx.rotate(Math.PI / 4); // 旋转 45°
ctx.fillRect(-25, -25, 50, 50); // 在新坐标系中画正方形
ctx.restore(); // 恢复原始状态
```

## 动画基础

> 使用 `requestAnimationFrame` 实现流畅动画。

```js
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清屏
  ctx.fillRect(x, 100, 50, 50);
  x += 2;
  if (x < canvas.width) requestAnimationFrame(animate);
}
animate();
```

> **关键原则**：清屏 → 更新状态 → 重绘 → 循环。

## 高级技巧（进阶）

### 1. 离屏 Canvas（性能优化）

```js
const offscreen = document.createElement("canvas");
offscreen.width = 100;
offscreen.height = 100;
const offCtx = offscreen.getContext("2d");
// 在离屏 canvas 上绘制复杂图形
offCtx.fillText("Cached", 10, 50);
// 主 canvas 直接 drawImage 引用
ctx.drawImage(offscreen, 0, 0);
```

### 2. 裁剪区域（clip）

```js
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.clip(); // 后续绘制仅在此圆形区域内可见
ctx.fillRect(0, 0, 200, 200); // 只显示圆内部分
```

## 导出与交互

### 1. 导出为图片

```js
canvas.toDataURL("image/png"); // 返回 base64 URL
canvas.toBlob(callback, "image/jpeg", 0.9); // 生成 Blob
```

### 2. 鼠标事件监听

```js
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log("点击位置:", x, y);
});
```

## 离屏 Canvas

离屏 Canvas（Offscreen Canvas）是 HTML5 Canvas API 的一个扩展，允许在 Web Worker 线程中创建和操作 `<canvas>` 元素，而**不依赖主线程的 DOM**。这在需要高性能图形渲染（如数据可视化、游戏、复杂图表等）场景中非常有用，可以显著提升性能并避免阻塞 UI。

### 一、核心优势

- **非阻塞主线程**：渲染计算在 Web Worker 中进行，不会影响页面响应。
- **更高帧率**：尤其适用于动画、实时数据可视化等对性能敏感的场景。
- **更好的资源隔离**：Worker 中的 Canvas 与 DOM 解耦，便于模块化和测试。

### 二、基本用法

#### 1. 创建 OffscreenCanvas

```js
// 主线程
const offscreen = new OffscreenCanvas(width, height);
const worker = new Worker("worker.js");

// 将 OffscreenCanvas 传递给 Worker
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

> 注意：`OffscreenCanvas` 对象通过 `Transferable` 方式传递，主线程将失去对其的控制权。

#### 2. 在 Worker 中使用

```js
// worker.js
self.onmessage = (event) => {
  const { canvas } = event.data;
  const ctx = canvas.getContext("2d");

  // 执行绘制操作
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 如果需要将结果传回主线程显示：
  const bitmap = canvas.transferToImageBitmap();
  self.postMessage({ bitmap }, [bitmap]);
};
```

#### 3. 主线程接收并显示

```js
// 主线程
worker.onmessage = (e) => {
  const { bitmap } = e.data;
  const canvas = document.getElementById("display-canvas");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0);
};
```

> 或者，如果目标是直接显示 OffscreenCanvas（现代浏览器支持）：

```js
const placeholderCanvas = document.getElementById("placeholder");
const offscreen = placeholderCanvas.transferControlToOffscreen();
// 然后传给 Worker，Worker 可直接渲染到该 canvas
```

### 三、适用场景（前端可视化方向）

| 场景                 | 说明                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------ |
| **大规模数据可视化** | 如 ECharts 渲染百万级点图时，可将 Canvas 渲染移至 Worker。                           |
| **实时动画/仪表盘**  | 高频更新的图表（如股票行情、监控面板）可避免卡顿。                                   |
| **WebGL 可视化**     | OffscreenCanvas 也支持 `webgl` 上下文，适合 Three.js、Deck.gl 等库在 Worker 中渲染。 |
| **图像处理**         | 在 Worker 中用 Canvas 做滤镜、合成等，不阻塞 UI。                                    |

### 四、兼容性与限制

- **浏览器支持**：Chrome 69+、Firefox 68+、Edge 79+；Safari 16.4+（部分支持）。
- **不支持 DOM 操作**：Worker 中无法访问 `document`、`window` 等。
- **调试困难**：Worker 中的 Canvas 无法直接在 DevTools 中 inspect。
- **上下文限制**：某些高级 Canvas 功能（如 `createPattern` 使用 DOM 元素）不可用。

### 五、与主流可视化库结合

- **ECharts**：从 v5 开始实验性支持 `useOffscreenCanvas: true`（需配合 `canvasRenderer`）。
- **Apache ECharts GL**：可结合 OffscreenCanvas 实现 3D 图表的高性能渲染。
- **Deck.gl / Mapbox**：支持在 Worker 中使用 OffscreenCanvas 提升地图渲染性能。

### 六、最佳实践建议

1. **仅在性能瓶颈时使用**：OffscreenCanvas 增加了通信开销，简单图表无需使用。
2. **避免频繁 transfer**：`transferToImageBitmap()` 有性能成本，尽量批量或按需传输。
3. **降级处理**：检测 `window.OffscreenCanvas` 是否存在，提供主线程 Canvas 回退方案。

```js
const useOffscreen = typeof OffscreenCanvas !== "undefined";
```

> 除了使用 OffscreenCanvas API（配合 Web Worker）实现真正的“离屏渲染”外，前端开发中还有一种常见的、基于 document.createElement('canvas') 的“伪离屏 Canvas”技术。

## Canvas 中的 `save()` 与 `restore()`：状态管理的核心机制

在 HTML5 Canvas 的可视化开发中，`CanvasRenderingContext2D.save()` 和 `CanvasRenderingContext2D.restore()` 是两个看似简单却极其关键的方法。它们共同构成了 Canvas **绘图上下文状态管理**的基础，是实现复杂、可维护、高性能可视化应用的重要工具。

本文将系统介绍 `save()` / `restore()` 的原理、典型使用场景及最佳实践，帮助开发者更高效地驾驭 Canvas。

### 一、基本原理

Canvas 的绘图上下文（`ctx`）包含大量状态属性，例如：

- 坐标变换矩阵（`translate`, `rotate`, `scale`）
- 裁剪区域（`clip`）
- 样式属性（`fillStyle`, `strokeStyle`, `lineWidth`, `font` 等）
- 全局合成属性（`globalAlpha`, `globalCompositeOperation`）

这些状态是**全局共享**的——一旦修改，会影响后续所有绘制操作。

#### ✅ `ctx.save()`

将当前完整的绘图状态**压入内部栈**（LIFO 结构）。

#### ✅ `ctx.restore()`

从栈中**弹出最近一次保存的状态**，并恢复为当前上下文状态。

> ⚠️ 注意：
>
> - `save()` / `restore()` **不保存像素内容**，仅保存“绘图设置”。
> - 可嵌套调用，形成多层状态快照。
> - 若栈为空时调用 `restore()`，不会报错，但无效果。

### 二、核心价值：状态隔离

`save()` / `restore()` 的本质是提供一种 **“临时沙箱”** 机制：

> “我可以在不影响外部环境的前提下，自由修改绘图状态，用完后一键还原。”

这一特性使其成为构建模块化、可复用可视化组件的关键。

### 三、典型使用场景

#### 1. 局部坐标系变换

在绘制旋转、缩放或偏移的图形时，避免影响后续绘制。

```js
ctx.save();
ctx.translate(200, 200);
ctx.rotate(Math.PI / 4);
ctx.fillRect(-25, -25, 50, 50); // 在新坐标系中绘制
ctx.restore(); // 恢复原始坐标系
```

#### 2. 临时样式修改

快速切换颜色、线宽等样式，无需手动重置。

```js
ctx.save();
ctx.strokeStyle = "red";
ctx.lineWidth = 3;
ctx.strokeRect(10, 10, 100, 100);
ctx.restore(); // 自动恢复原样式
```

#### 3. 递归绘图（如分形树、粒子系统）

每一层递归使用独立坐标系，确保子结构不影响父结构。

```js
function drawBranch(len, depth) {
  if (depth === 0) return;
  // 绘制主干
  ctx.translate(0, -len);

  ctx.save();
  ctx.rotate(-angle); drawBranch(...); ctx.restore(); // 左分支

  ctx.save();
  ctx.rotate(angle);  drawBranch(...); ctx.restore(); // 右分支
}
```

#### 4. 局部裁剪（Clipping）

限制绘制区域（如圆形头像、仪表盘扇区），防止裁剪影响全局。

```js
ctx.save();
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.clip();
ctx.drawImage(img, 50, 50, 100, 100); // 仅在圆内可见
ctx.restore(); // 裁剪失效，恢复正常绘制
```

#### 5. 图层式逻辑组织

模拟“图层”概念，将背景、UI、数据可视化等模块解耦。

```js
drawBackground();
ctx.save();
drawUI();
ctx.restore();
ctx.save();
drawChart();
ctx.restore();
```

#### 6. 动画中的状态隔离

在复杂动画中，确保每个运动元素拥有独立的变换上下文。

```js
// 主体旋转
ctx.save();
ctx.rotate(mainAngle);
drawMain();

// 子部件1
ctx.save(); ctx.translate(...); ctx.rotate(sub1); drawPart(); ctx.restore();

// 子部件2
ctx.save(); ctx.translate(...); ctx.rotate(sub2); drawPart(); ctx.restore();

ctx.restore(); // 回到全局
```

#### 7. 可复用组件封装

构建“无副作用”的可视化组件（如进度环、雷达图、自定义图标）。

```js
function drawProgressRing(ctx, x, y, r, p) {
  ctx.save();
  ctx.translate(x, y);
  // ... 绘制逻辑
  ctx.restore(); // 不污染调用者状态
}
```

#### 8. 临时合成与透明度

安全启用 `globalAlpha` 或 `globalCompositeOperation`（如橡皮擦效果）。

```js
ctx.save();
ctx.globalCompositeOperation = "destination-out";
ctx.fillRect(100, 100, 50, 50); // 擦除像素
ctx.restore();
```

### 四、最佳实践建议

| 建议                 | 说明                                                |
| -------------------- | --------------------------------------------------- |
| **成对使用**         | 每次 `save()` 应有对应的 `restore()`，避免状态泄漏  |
| **尽早恢复**         | 在函数/模块结束前调用 `restore()`，保持作用域清晰   |
| **避免过度嵌套**     | 深度过大可能影响性能和可读性，合理拆分逻辑          |
| **组件内必用**       | 所有可复用绘制函数应包裹 `save/restore`，保证隔离性 |
| **不要依赖自动重置** | 手动重置所有样式易出错，`save/restore` 更可靠       |

### 五、总结

`save()` 与 `restore()` 虽然只是两个方法，却是 Canvas 可视化工程化的基石。它们让开发者能够：

- 安全地进行局部状态修改
- 构建高内聚、低耦合的绘制模块
- 避免“全局状态污染”导致的 bug
- 提升代码可读性与可维护性

> **记住：每一次你打算“临时改变画布状态”，都应该先 `save()`，再 `restore()`。**

在构建图表库、游戏引擎、图形编辑器、数据大屏等复杂前端可视化项目时，善用这一对方法，将显著提升开发效率与系统稳定性。

**参考文档**：

- [MDN: CanvasRenderingContext2D.save()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save)
- [MDN: CanvasRenderingContext2D.restore()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore)

## ✅ 重点知识总结

| 类别     | 关键点                                              |
| -------- | --------------------------------------------------- |
| **基础** | `getContext('2d')`、正确设置宽高                    |
| **路径** | `beginPath`/`moveTo`/`lineTo`/`arc`/`fill`/`stroke` |
| **矩形** | `fillRect`/`strokeRect`（直接绘制）                 |
| **文本** | `fillText`、字体与对齐设置                          |
| **图像** | `drawImage`（三种重载形式）                         |
| **样式** | `fillStyle`、`strokeStyle`、`globalAlpha`、阴影     |
| **变换** | `translate`/`rotate`/`scale` + `save`/`restore`     |
| **动画** | `requestAnimationFrame` + 清屏重绘循环              |

## 📚 学习建议

1. **参考 MDN**：[Canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial) 权威详尽。
2. **项目驱动**：尝试做一个简易画板、时钟、粒子效果、拼图、贪吃蛇或数据图表。
