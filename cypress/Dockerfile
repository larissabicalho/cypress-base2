# Usa a imagem base do Node.js (versão 20 slim)
FROM node:20-slim
# Definir o fuso horário e ambiente não interativo
ENV TZ=America/Sao_Paulo
ENV DEBIAN_FRONTEND=noninteractive
# Definir diretório de trabalho no container
WORKDIR /app
# Instalar dependências do sistema necessárias para Cypress e Xvfb
RUN apt-get update && apt-get install -y \
   libgtk-3-0 libnotify4 libnss3 libxss1 libasound2 libx11-xcb1 \
   libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libatk1.0-0 \
   libcups2 libxrandr2 libgbm1 libatspi2.0-0 libappindicator3-1 \
   fonts-liberation xauth curl xvfb \
&& rm -rf /var/lib/apt/lists/*
# Copiar apenas os manifests para instalar dependências
COPY package*.json ./
# Instalar dependências Node.js (sem cache, sem sobrescrever node_modules depois)
RUN npm ci
# Definir a pasta de cache do Cypress fora do /app
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress
# Instalar e verificar Cypress
RUN mkdir -p $CYPRESS_CACHE_FOLDER \
&& npx cypress install \
&& npx cypress verify
# Copiar o restante do projeto (exceto node_modules)
COPY . .
# Expor a porta 3000 (se necessário)
EXPOSE 3000
# Comando default
CMD ["npm", "run", "test:full"]
