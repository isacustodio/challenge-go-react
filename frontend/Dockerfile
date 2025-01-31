FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN test -f src/index.tsx || (echo "Erro: src/index.tsx não encontrado!" && exit 1)

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
