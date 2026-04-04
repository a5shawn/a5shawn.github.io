# 基于 Docker 的后端项目部署

## 1. 打包

- mvn clean
- mvn package

## 2. Dockerfile

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

## 3. 制作镜像

```shell
docker build . -t lms-be
```

## 4. 运行容器

```shell
docker run -d --name lms-be -p 8080:8080 --network master lms-be
```
