export default function Hero() {
  return (
    <div className="sidebar-content">
      <div className="sidebar-badge fade-in">
        <span className="hero-badge-dot" />
        从前端出发，向全栈进阶
      </div>
      <h1 className="sidebar-headline fade-in" style={{ animationDelay: '0.1s' }}>
        热爱探索技术边界<br />用代码构建可能性
      </h1>
      <p className="sidebar-bio fade-in" style={{ animationDelay: '0.15s' }}>
        从前端起步，深入后端与基础设施，追求优雅高效的解决方案。
      </p>
      <div className="sidebar-name fade-in" style={{ animationDelay: '0.2s' }}>
        <span>康祥祥</span> / Shawn Kang
      </div>
    </div>
  )
}
