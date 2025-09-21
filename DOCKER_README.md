# Docker Deployment cho Next.js App

## 📋 Files đã tạo

### 1. `Dockerfile`
- Multi-stage build với Node.js 20 Alpine
- Stage 1: Build dependencies và build app
- Stage 2: Production image chỉ với standalone output
- Tối ưu kích thước và bảo mật

### 2. `docker-compose.yml`
- Service đơn giản chạy trên port 3000
- Health check tích hợp
- Environment variables cấu hình

### 3. `.github/workflows/docker-build.yml`
- Tự động build và push lên Docker Hub
- Support multi-platform (amd64, arm64)
- Test image sau khi build
- Cache tối ưu với GitHub Actions

### 4. `.dockerignore`
- Loại bỏ files không cần thiết trong Docker build context

## 🚀 Cách sử dụng

### Local Development
```bash
# Build image
docker build -t post-ssr-app .

# Run với docker-compose
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Deployment
```bash
# Pull image từ Docker Hub (sau khi CI/CD chạy)
docker pull your-dockerhub-username/post-ssr:latest

# Run production
docker run -d -p 3000:3000 your-dockerhub-username/post-ssr:latest
```

## ⚙️ Cấu hình GitHub Actions

Cần thêm các secrets trong GitHub repository:

1. **DOCKER_USERNAME**: Username Docker Hub của bạn
2. **DOCKER_PASSWORD**: Password hoặc Access Token Docker Hub

### Cách thêm secrets:
1. Vào Settings > Secrets and variables > Actions
2. Thêm `DOCKER_USERNAME` và `DOCKER_PASSWORD`

## 🔧 Cấu hình Next.js

File `next.config.js` đã được cập nhật với:
```javascript
output: "standalone" // Tối ưu cho Docker deployment
```

## 📊 Monitoring & Health Check

- Container có health check tích hợp
- Port 3000 được expose
- Logs có thể được monitor qua `docker logs`

## 🛡️ Security Features

- Sử dụng non-root user (nextjs:nodejs)
- Alpine Linux base image (nhẹ và an toàn)
- Multi-stage build giảm attack surface

## 📈 Performance Optimizations

- Standalone output giảm kích thước image
- Layer caching với GitHub Actions
- Multi-platform build support
- Optimized .dockerignore

## 🔍 Troubleshooting

### Container không start:
```bash
docker logs container-name
```

### Check health:
```bash
docker exec container-name node --version
```

### Port conflicts:
Thay đổi port mapping trong `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # External:Internal
```