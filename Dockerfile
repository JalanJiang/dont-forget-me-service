FROM node:latest

COPY . /workspace
WORKDIR /workspace
RUN npm install

EXPOSE 8088

#ENTRYPOINT ["node", "app.js"]