FROM node:17-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# Development
CMD ["npm", "run", "dev"]

# Production
# RUN npm install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]