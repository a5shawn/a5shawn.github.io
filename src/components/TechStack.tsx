import {
  SiJavascript,
  SiTypescript,
  SiVuedotjs,
  SiReact,
  SiElectron,
  SiNodedotjs,
  SiDeno,
  SiPython,
  SiMysql,
  SiRedis,
  SiMongodb,
  SiNginx,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import { FaCode } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  JavaScript: <SiJavascript color="#F7DF1E" />,
  TypeScript: <SiTypescript color="#3178C6" />,
  Vue: <SiVuedotjs color="#4FC08D" />,
  React: <SiReact color="#61DAFB" />,
  Electron: <SiElectron color="#9FEAF9" />,
  Uniapp: <FaCode color="#2B9939" />,
  Python: <SiPython color="#3776AB" />,
  "Node.js": <SiNodedotjs color="#339933" />,
  Deno: <SiDeno color="#70FFAF" />,
  MySQL: <SiMysql color="#4479A1" />,
  Redis: <SiRedis color="#DC382D" />,
  MongoDB: <SiMongodb color="#47A248" />,
  Nginx: <SiNginx color="#009639" />,
  Docker: <SiDocker color="#2496ED" />,
  K8s: <SiKubernetes color="#326CE5" />,
};

interface TechItem {
  name: string;
  detail?: string;
}

interface TechCategory {
  id: string;
  name: string;
  icon: string;
  items: TechItem[];
}

const categories: TechCategory[] = [
  {
    id: "frontend",
    name: "前端开发",
    icon: "◆",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Vue" },
      { name: "React" },
      { name: "Electron" },
      { name: "Uniapp" },
    ],
  },
  {
    id: "backend",
    name: "后端开发",
    icon: "⚡",
    items: [
      { name: "Node.js", detail: "Express / NestJS" },
      { name: "Python", detail: "FastAPI / Django" },
    ],
  },
  {
    id: "database",
    name: "数据库",
    icon: "⛁",
    items: [{ name: "MySQL" }, { name: "Redis" }, { name: "MongoDB" }],
  },
  {
    id: "devops",
    name: "运维",
    icon: "⚙",
    items: [{ name: "Nginx" }, { name: "Docker" }, { name: "K8s" }],
  },
];

export default function TechStack() {
  return (
    <div className="tech-panel" id="tech">
      <p className="section-label fade-in">/ tech-stack</p>
      <div className="tech-grid-2x2" style={{ marginTop: 8 }}>
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className={`tech-card fade-in`}
            style={{ animationDelay: `${0.15 + i * 0.08}s` }}
          >
            <div className="tech-card-header">
              <span className={`tech-card-icon ${cat.id}`}>{cat.icon}</span>
              <span className="tech-card-name">{cat.name}</span>
            </div>
            <div className="tech-card-items">
              {cat.items.map((item) => (
                <span key={item.name} className="tech-card-item">
                  {iconMap[item.name] && (
                    <span className="tech-item-icon">{iconMap[item.name]}</span>
                  )}
                  {item.name}
                  {item.detail && (
                    <span className="tech-item-detail"> ({item.detail})</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
