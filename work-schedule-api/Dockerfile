FROM node:17-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

# Bundle app source
COPY . .

EXPOSE 8080

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown -R appuser:appgroup /app

# Tell docker that all future commands should run as the appuser user
USER appuser

# Development
# CMD ["npm", "run", "start"]

# Production
# RUN npm install -g pm2
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]