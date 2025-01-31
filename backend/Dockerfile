# Usa a imagem oficial do Golang
FROM golang:1.22

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Baixa as dependências
RUN go mod tidy

# Compila a aplicação
RUN go build -o main .

# Define o comando padrão para rodar a aplicação
CMD ["/app/main"]