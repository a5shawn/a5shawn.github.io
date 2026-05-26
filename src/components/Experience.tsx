const journey = [
  { period: '起步', title: '前端开发', items: 'JavaScript / TypeScript · Vue · React · Electron · Uniapp' },
  { period: '进阶', title: '后端开发', items: 'Node.js · Express · NestJS · Deno · Oak · Hono' },
  { period: '拓展', title: '数据与运维', items: 'MySQL · Redis · MongoDB · Nginx · Docker · K8s' },
  { period: '目标', title: '全栈工程师', items: '持续学习，构建更好的数字产品' },
]

export default function Experience() {
  return (
    <div className="section-compact" id="experience">
      <p className="section-label fade-in">/ journey</p>
      <div className="journey-strip" style={{ marginTop: 8 }}>
        {journey.map((step, i) => (
          <div key={step.title} className="journey-chip fade-in" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
            <div className="journey-chip-num">0{i + 1}</div>
            <div className="journey-chip-body">
              <span className="journey-chip-period">{step.period}</span>
              <span className="journey-chip-title">{step.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
