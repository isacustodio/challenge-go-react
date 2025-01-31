# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Instala as dependências
RUN npm install

# Verificar se `index.tsx` existe antes de tentar compilar
RUN test -f src/index.tsx || (echo "Erro: src/index.tsx não encontrado!" && exit 1)

# Construir o projeto
RUN npm run build

# Expõe a porta 3000 para desenvolvimento
EXPOSE 3000

# Iniciar a aplicação
CMD ["npm", "start"]
