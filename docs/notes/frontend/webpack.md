# Webpack

## Webpack 性能优化

Webpack 性能优化可以从**构建速度**和**输出 bundle 体积**两个维度进行。

### 一、提升构建速度

#### 1. 使用最新版本的 Webpack

- 新版本通常包含性能改进和 bug 修复。
- Webpack5 相比 4 在持久化缓存、模块联邦等方面有显著提升。

#### 2. 启用持久化缓存

- webpack 5 内置缓存机制，无需额外插件。

```js
// webpack.config.js
module.exports = {
  cache: {
    type: "filesystem", // 启用文件系统缓存
    buildDependencies: {
      config: [__filename], // 当配置文件变化时，使缓存失效
    },
  },
};
```

- webpack 4 需借助第三方插件 cache-loader

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // cache-loader 放在最前面
        use: ["cache-loader", "babel-loader"],
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
};
```

#### 3. 使用多线程处理

- 将耗时的 loader（如 Babel、TS）放到 worker 线程中：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["thread-loader", "babel-loader"],
      },
    ],
  },
};
```

> 注意：启动线程也有开销，仅对大型项目有效。
>
> 使用 thread-loader 或 happy-pack（已弃用）。

#### 4. 限制 loader 作用范围

避免遍历 `node_modules`：

```js
{
  test: /\.js$/,
  include: path.resolve(__dirname, 'src'),
  exclude: /node_modules/,
  use: 'babel-loader'
}
```

#### 5. 使用 DllPlugin

- 预编译第三方依赖，避免重复构建。

> 适用于 Webpack 4，Webpack 5 推荐使用 Module Federation 或 cache

### 二、减小打包体积

#### 1. 代码分割

- SplitChunksPlugin（Webpack 4+ 内置）：

  核心作用：

  - 提取公共代码
  - 分离第三方依赖
  - 避免重复打包相同代码

```js
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all", // 'initial' | 'async' | 'all'
      minSize: 20000, // 模块大于 20KB 才拆分（Webpack 5 默认值）
      maxSize: 244000, // 单个 chunk 最大不超过 244KB（可选）
      minChunks: 1, // 模块至少被引用 1 次就考虑拆分
      maxAsyncRequests: 30, // 异步加载最大并行请求数
      maxInitialRequests: 30, // 初始加载最大并行请求数
      cacheGroups: {
        common: {}, // 提取公共代码
        vendor: {}, // 分离第三方依赖
      },
    },
  },
};
```

> 结合 webpack-bundle-analyzer 分析拆分效果
>
> 避免过度拆分：太多小 chunk 会增加 HTTP 请求开销（尤其 HTTP/1.1）

#### 2. 代码压缩

- 使用 OptimizeCSSAssetsPlugin（v4） / CssMinimizerPlugin（v5） 压缩 CSS
- 使用 TerserWebpackPlugin 压缩 JS
  - Webpack v4 内置了 uglifyjs-webpack-plugin（基于 UglifyJS），但不支持 ES6+。

```js
// webpack.config.js

// v4
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// v5
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// Webpack v5 默认内置 TerserPlugin，且支持 ES6+，无需安装或配置即可工作！
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production", // 必须！否则不压缩
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩 CSS
      new OptimizeCSSAssetsPlugin(), // v4
      new CssMinimizerPlugin(), // v5
      // 压缩 JS
      new TerserPlugin({
        parallel: true, // 多进程并行压缩，提速
        terserOptions: {
          compress: {
            drop_console: true, // 删除 console
            drop_debugger: true,
          },
          mangle: true, // 混淆变量名
          format: {
            comments: false, // 删除注释
          },
        },
      }),
    ],
  },
};
```

#### 3. Tree Shaking

Tree Shaking（摇树优化） 是 Webpack（及其他现代打包工具如 Rollup、Vite）中一种消除 JavaScript 死代码（Dead Code Elimination） 的优化技术。它的目标是：只打包实际用到的代码，移除未引用的导出（exports），从而减小最终 bundle 体积。

- 必须使用 ES6 模块（ESM）
  - ES6（import/export）模块是静态的：依赖关系在编译时确定，可分析哪些导出未被使用。
  - CommonJS（require/module.exports）是动态的：无法在构建时确定使用情况，无法 Tree Shaking。
- Webpack 4/5 设置 mode: 'production' 自动启用。

> 建议：项目中尽量使用 ES6 模块语法，并优先选择支持 ESM 的第三方库（如 lodash-es 而非 lodash）。

#### 4. PurgeCSS

移除未使用的 CSS，效果类似于 JavaScript 的 Tree Shaking。

- 结合 mini-css-extract-plugin + purgecss-webpack-plugin：

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

// 获取所有模板文件路径（根据项目结构调整）
const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractBuilder.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // 仅在生产环境启用 PurgeCSS
    ...(process.env.NODE_ENV === "production"
      ? [
          new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            // 可选：安全列表（永不删除的类名）
            safelist: ["active", "show", /^fade-/],
            // 可选：忽略特定文件
            // ignore: ['/node_modules/']
          }),
        ]
      : []),
  ],
};
```

#### 5. 图片优化

- 使用 image-webpack-loader 压缩图片。

```js
{
  test: /\.(png|jpe?g|gif|svg)$/i,
  use: [
    // 👇 先处理资源类型（v5 用 asset，v4 用 url/file-loader）
    ...resourceLoaderConfig,
    // 👇 再压缩（必须放最后！）
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: { progressive: true, quality: 70 },
        pngquant: { quality: [0.6, 0.8] },
        svgo: { plugins: [{ removeViewBox: false }] }
      }
    }
  ]
}
```
