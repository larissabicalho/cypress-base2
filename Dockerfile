
FROM jenkins/jenkins:lts

USER root

# Instalar dependências do sistema e Node.js + Cypress
RUN apt-get update && apt-get install -y \
    libgtk-3-0 libnotify4 libnss3 libxss1 libasound2 libx11-xcb1 \
    libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libatk1.0-0 \
    libcups2 libxrandr2 libgbm1 libatspi2.0-0 libappindicator3-1 \
    fonts-liberation xauth curl xvfb gnupg2 lsb-release apt-transport-https ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g cypress && \
    apt-get clean

# Ativar diagnóstico de tarefas duráveis
ENV JAVA_OPTS="-Dorg.jenkinsci.plugins.durabletask.BourneShellScript.LAUNCH_DIAGNOSTICS=true"

USER jenkins
