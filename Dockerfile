FROM node:18-alphine As development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and intallation depencies
COPY package*.json .
RUN npm ci --force
# Copy app files
COPY . .
EXPOSE 3000
# start the app 
CMD ["npm", "start"]
