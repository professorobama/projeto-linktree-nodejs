// public/script.js

const API_URL = '/api/links';

// Elementos do DOM
const linksContainer = document.getElementById('links-container');
const addLinkForm = document.getElementById('add-link-form');
const tituloInput = document.getElementById('titulo');
const urlInput = document.getElementById('url');

// --- [R]EAD ---
// Função para carregar e renderizar todos os links
async function carregarLinks() {
    try {
        const response = await fetch(API_URL);
        const links = await response.json();

        linksContainer.innerHTML = ''; // Limpa a lista antes de recarregar

        links.forEach(link => {
            linksContainer.appendChild(criarElementoLink(link));
        });

    } catch (error) {
        console.error('Erro ao carregar links:', error);
    }
}

// Função helper para criar o HTML de um link
function criarElementoLink(link) {
    const div = document.createElement('div');
    div.className = 'link-item';
    div.setAttribute('data-id', link.id); // Armazena o ID no elemento

    div.innerHTML = `
        <div class="link-item-info">
            <strong>${link.titulo}</strong>
            <span>${link.url}</span>
        </div>
        <div class="link-actions">
            <button class="btn btn-secondary">Editar</button>
            <button class="btn btn-danger">Excluir</button>
        </div>
    `;

    // Adiciona os eventos de clique nos botões
    div.querySelector('.btn-danger').addEventListener('click', () => excluirLink(link.id));
    div.querySelector('.btn-secondary').addEventListener('click', () => mostrarFormEdicao(div, link));

    return div;
}

// --- [C]REATE ---
// Event listener para o formulário de ADICIONAR
addLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const titulo = tituloInput.value;
    const url = urlInput.value;

    if (!titulo || !url) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, url }),
        });

        if (response.ok) {
            // Limpa o formulário e recarrega a lista
            tituloInput.value = '';
            urlInput.value = '';
            await carregarLinks();
        } else {
            alert('Erro ao adicionar link.');
        }
    } catch (error) {
        console.error('Erro ao criar link:', error);
    }
});

// --- [D]ELETE ---
// Função para excluir um link
async function excluirLink(id) {
    // Confirmação (boa prática)
    if (!confirm('Tem certeza que deseja excluir este link?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            await carregarLinks(); // Recarrega a lista
        } else {
            alert('Erro ao excluir link.');
        }
    } catch (error) {
        console.error('Erro ao excluir link:', error);
    }
}

// --- [U]PDATE (Parte 1) ---
// Função para substituir o item do link por um formulário de edição
function mostrarFormEdicao(itemDiv, link) {
    // Cria um formulário de edição
    const form = document.createElement('form');
    form.className = 'edit-form';
    form.innerHTML = `
        <div class="form-group">
            <label>Novo Título</label>
            <input type="text" class="edit-titulo" value="${link.titulo}" required>
        </div>
        <div class="form-group">
            <label>Nova URL</label>
            <input type="url" class="edit-url" value="${link.url}" required>
        </div>
        <div class="edit-form-actions">
            <button type="submit" class="btn btn-success">Salvar</button>
            <button type="button" class="btn btn-secondary">Cancelar</button>
        </div>
    `;

    // Substitui o item pelo formulário no DOM
    itemDiv.parentNode.replaceChild(form, itemDiv);

    // Adiciona eventos aos botões do formulário de edição
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const novoTitulo = form.querySelector('.edit-titulo').value;
        const novaUrl = form.querySelector('.edit-url').value;
        salvarEdicao(link.id, novoTitulo, novaUrl);
    });

    form.querySelector('.btn-secondary').addEventListener('click', () => {
        // Se cancelar, apenas recarrega a lista (desfaz a edição)
        carregarLinks();
    });
}

// --- [U]PDATE (Parte 2) ---
// Função para enviar os dados de edição para a API
async function salvarEdicao(id, titulo, url) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, url }),
        });

        if (response.ok) {
            await carregarLinks(); // Recarrega a lista
        } else {
            alert('Erro ao atualizar link.');
        }
    } catch (error) {
        console.error('Erro ao atualizar link:', error);
    }
}


// --- Ponto de Partida ---
// Carrega os links assim que a página é aberta
document.addEventListener('DOMContentLoaded', carregarLinks);