# 🔗 Projeto: Agregador de Links (Meu Linktree)

Uma aplicação Full-Stack completa que funciona como um gerenciador de links pessoais (similar ao Linktree). O projeto implementa um **CRUD (Create, Read, Update, Delete)** completo.

Este projeto foi desenvolvido com foco em demonstrar uma API RESTful completa e sua interação com um frontend de JavaScript puro (Vanilla JS).

## 🚀 Tecnologias Utilizadas

* **Backend:**
    * Node.js
    * Express.js (para a API RESTful)
    * MySQL (com o driver `mysql2`)
    * `cors`
* **Frontend:**
    * HTML5
    * CSS3 (Mobile-First com Flexbox)
    * JavaScript (ES6+ com `fetch` e `async/await`)

## ⭐️ Funcionalidades

* **(Create)** Adicionar novos links através de um formulário.
* **(Read)** Listar todos os links cadastrados no banco de dados.
* **(Update)** Editar o título e a URL de um link existente.
* **(Delete)** Excluir um link da lista.
* **Interface Responsiva:** Funciona perfeitamente em desktops e celulares.

## 🗄️ Endpoints da API (CRUD Completo)

A API RESTful está na raiz do projeto (`/api`):

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/links` | **Cria** um novo link. Espera `{ "titulo": "...", "url": "..." }` no body. |
| `GET` | `/api/links` | **Lê** (busca) todos os links cadastrados. |
| `PUT` | `/api/links/:id` | **Atualiza** um link existente. Espera `{ "titulo": "...", "url": "..." }` no body. |
| `DELETE` | `/api/links/:id` | **Exclui** um link existente pelo seu ID. |

## 📦 Como Executar o Projeto

### Pré-requisitos
* Node.js instalado
* Um servidor MySQL rodando

### 1. Clonar e Instalar
```bash
git clone [https://github.com/seu-usuario/projeto-linktree.git](https://github.com/seu-usuario/projeto-linktree.git)
cd projeto-linktree
npm install
