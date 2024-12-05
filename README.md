README para o Front-End (React)
markdown
Copiar código
# Front-End - Consultório Médico

Este é o front-end de um sistema de consultório médico, desenvolvido em React. O sistema permite o cadastro de pacientes, médicos e consultas, além de gerenciar essas informações de maneira eficiente.

## 🛠️ Tecnologias Utilizadas
- React
- Axios (para chamadas HTTP)
- React Router DOM (para rotas)
- Bootstrap ou Material-UI (para estilização, caso utilizado)

## 📂 Estrutura do Projeto
src/ ├── components/ # Componentes reutilizáveis ├── pages/ # Páginas principais (Home, Cadastro, etc.) ├── services/ # Configuração de chamadas API (Axios) ├── App.js # Configuração principal da aplicação ├── index.js # Arquivo de entrada

bash
Copiar código

## 🚀 Configuração e Execução

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd front-end
Instale as dependências

bash
Copiar código
npm install
Configure o arquivo .env Crie um arquivo .env na raiz do projeto e adicione a URL do back-end:

bash
Copiar código
REACT_APP_API_URL=http://localhost:8080/api
Execute o projeto

bash
Copiar código
npm start
O front-end estará disponível em http://localhost:3000.

📋 Funcionalidades
Cadastro de Pacientes
Cadastro de Médicos
Cadastro de Consultas
Visualização e edição de dados
