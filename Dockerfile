FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json /app/
COPY src/.  /app/src/
COPY public/.  /app/public/
RUN npm i && npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
