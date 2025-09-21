# Dockerfile cho Next.js 14 Production
# Stage 1: Build dependencies và build application
FROM node:20-alpine AS builder

# Cài đặt libc6-compat để tương thích với Alpine
RUN apk add --no-cache libc6-compat

# Thiết lập working directory
WORKDIR /app

# Copy package files
COPY package*.json yarn.lock* ./

# Cài đặt ALL dependencies (bao gồm devDependencies để build)
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build ứng dụng
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

# Cài đặt libc6-compat và wget
RUN apk add --no-cache libc6-compat wget

# Thiết lập working directory
WORKDIR /app

# Tạo user nextjs
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output từ build stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Thiết lập user
USER nextjs

# Expose port
EXPOSE 3000

# Thiết lập environment variables
ENV PORT=3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Chạy ứng dụng
CMD ["node", "server.js"]