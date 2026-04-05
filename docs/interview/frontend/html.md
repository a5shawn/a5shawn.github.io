# HTML

## async 与 defer 有什么区别

async 和 defer 都能让脚本异步加载，不阻塞 HTML 解析。

主要区别在于执行时机：

- async 脚本加载完成后会立即执行，可能会打断 HTML 解析，且多个 async 脚本不保证执行顺序；
- defer 脚本会等待 HTML 解析完成后，在 DOMContentLoaded 事件之前按顺序执行。

因此，对于有依赖关系的业务脚本，我推荐使用 defer；对于完全独立的第三方脚本，如统计代码，可以使用 async。

另外，ES6 的模块脚本 `<script type="module">` 默认具有 defer 的行为。
