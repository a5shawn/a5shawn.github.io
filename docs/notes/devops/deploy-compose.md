# 基于 Docker Compose 的前后端项目部署

## 前端项目准备

### 1. 打包

`npm run build` 具体以前端项目为准.

### 2. nginx.conf

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  sendfile        on;
  keepalive_timeout  65;

  server {
    listen 8000;
    server_name x.x.x.x;

    location / {
      root /usr/share/nginx/html/lms;
      try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html/lms;
    }

    location /api/ {
        # 将以/api开头的请求代理到后端服务
        proxy_pass http://x.x.x.x:8080/;

        # 设置代理相关的头信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 跨域设置
        add_header 'Access-Control-Allow-Origin' '*'; # 允许所有来源的跨域请求，可根据需要指定具体源
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS'; # 允许的HTTP方法
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization'; # 允许的请求头
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range'; # 想要前端访问的响应头
        add_header 'Access-Control-Allow-Credentials' 'true'; # 如果需要携带Cookie，设为true
        add_header 'Access-Control-Max-Age' 1728000; # 预检请求的有效期

        # 处理OPTIONS预检请求
        if ($request_method = 'OPTIONS') {
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204; # 立即返回，结束请求，不转发到后端
        }
    }
  }

}
```

### 3. Dockerfile

```dockerfile
FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/lms/
```

## 后端项目准备

### 1. 打包

- mvn clean
- mvn package

### 2. Dockerfile

```dockerfile
# 基础镜像
FROM openjdk:17-jdk-alpine
# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 拷贝jar
COPY library-mgt-system-0.0.1-SNAPSHOT.jar /app.jar
# 入口
ENTRYPOINT [ "java", "-jar", "-Dspring.profiles.active=prod", "/app.jar" ]
```

## 编写 docker-compose.yml

```yaml
version: "3.3"

services:
  lms-be:
    build:
      context: ./backend
      dockerfile: Dockerfile
    image: lms-be
    container_name: lms-be
    restart: always
    ports:
      - "8080:8080"
    networks:
      - master
  lms-fe:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    image: lms-fe
    container_name: lms-fe
    restart: always
    ports:
      - "8000:8000"
    networks:
      - master
    depends_on:
      - lms-be
networks:
  master:
    external: true
```

## 制作镜像并运行

```shell
docker-compose up -d
```
