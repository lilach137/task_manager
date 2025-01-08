# Dockerfile.frontend

FROM node:18


WORKDIR /app

COPY . .

RUN npm install


RUN npm run build


CMD ["npm", "run", "dev"]

EXPOSE 5173
