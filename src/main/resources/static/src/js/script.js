const addM = document.getElementById("addM");
const botaoAdd = document.getElementById("botaoAdd");
const fecharAddM = document.getElementById("fecharAddM");
const lista = document.getElementById("lista");

let comidaParaEditar = null;
let comidaParaExcluir = null;

// Abrir e fechar modal de adicionar
botaoAdd.addEventListener("click", () => addM.showModal());
fecharAddM.addEventListener("click", () => addM.close());

// Função para buscar todos os alimentos
async function getAllComidas() {
    try {
        const response = await fetch("https://cardapio-ejfsfhfhg0ezh3d2.brazilsouth-01.azurewebsites.net/cardapio");
        if (!response.ok) throw new Error("Erro ao buscar dados do servidor.");
        const alimentos = await response.json();
        renderizarComidas(alimentos);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Não foi possível carregar os alimentos.");
    }
}

// Função para renderizar a lista de comidas
function renderizarComidas(comidas) {
    lista.innerHTML = '';
    comidas.forEach((comida) => {
        const comidaDiv = criarComidaDiv(comida);
        lista.appendChild(comidaDiv);
    });
}

// Função para criar elemento de comida
function criarComidaDiv(comida) {
    const comidaDiv = document.createElement("div");
    comidaDiv.className = 'comida';
    comidaDiv.innerHTML = `
       <section>
    <div id="lista" class="servicos">
        <div class="card">
            <div class="imagem">
                <img class="imagem" src="${comida.url}" alt="${comida.nome}">
            </div>
            <h3>${comida.nome}</h3>
            <hr>
            <p>${comida.descricao}</p>
            <hr>
            <p>R$ ${comida.preco.toFixed(2)}</p>
            <button onclick="confirmarExclusao(${comida.id})" class="botao_link_remover">Excluir</button>
            <button onclick="editarComida(${comida.id})" class="botao_link_alterar">Alterar</button>
        </div>
    </div>
</section>`

    return comidaDiv;
}

// Função para adicionar alimento
async function AddAlimento() {
    const novoAlimento = obterDadosFormulario("alimento", "descricao", "preco", "fotoAlimento");
    if (!novoAlimento) return;

    try {
        const response = await fetch("https://cardapio-ejfsfhfhg0ezh3d2.brazilsouth-01.azurewebsites.net/cardapio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAlimento),
        });

        if (response.ok) {
            alert("Comida adicionada com sucesso!");
            getAllComidas();
            addM.close();
        } else {
            alert("Erro ao adicionar comida.");
        }
    } catch (error) {
        console.error("Erro ao adicionar comida:", error);
        alert("Erro na conexão com o servidor.");
    }
}

// Função para editar comida
async function editarComida(id) {
    try {
        const response = await fetch(`https://cardapio-ejfsfhfhg0ezh3d2.brazilsouth-01.azurewebsites.net/cardapio/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do alimento.");

        const comida = await response.json();
        comidaParaEditar = comida.id;

        preencherFormulario("alimentoEdit", "descricaoEdit", "precoEdit", "fotoAlimentoEdit", comida);
        document.getElementById("editM").showModal();
    } catch (error) {
        console.error("Erro ao carregar comida:", error);
        alert("Não foi possível carregar os dados do alimento.");
    }
}

// Função para salvar alterações na comida
async function SaveEdit() {
    const comidaEditada = obterDadosFormulario("alimentoEdit", "descricaoEdit", "precoEdit", "fotoAlimentoEdit");
    if (!comidaEditada) return;

    try {
        const response = await fetch(`https://cardapio-ejfsfhfhg0ezh3d2.brazilsouth-01.azurewebsites.net/cardapio/${comidaParaEditar}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comidaEditada),
        });

        if (response.ok) {
            alert("Comida editada com sucesso!");
            getAllComidas();
            document.getElementById("editM").close();
        } else {
            alert("Erro ao editar comida.");
        }
    } catch (error) {
        console.error("Erro ao editar comida:", error);
        alert("Erro ao salvar alterações.");
    }
}


// Função para confirmar exclusão
function confirmarExclusao(id) {
    comidaParaExcluir = id;
    document.getElementById("modalExcluir").showModal();
}

// Função para excluir comida
async function excluirComida() {
    try {
        const response = await fetch(`https://cardapio-ejfsfhfhg0ezh3d2.brazilsouth-01.azurewebsites.net/cardapio/${comidaParaExcluir}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Comida excluída com sucesso!");
            getAllComidas();
            document.getElementById("modalExcluir").close();
        } else {
            alert("Erro ao excluir comida.");
        }
    } catch (error) {
        console.error("Erro ao excluir comida:", error);
        alert("Erro na conexão com o servidor.");
    }
}

// Funções utilitárias
function obterDadosFormulario(nomeId, descricaoId, precoId, urlId) {
    const nome = document.getElementById(nomeId).value.trim();
    const descricao = document.getElementById(descricaoId).value.trim();
    const preco = parseFloat(document.getElementById(precoId).value);
    const url = document.getElementById(urlId).value.trim();

    if (!nome || !descricao || isNaN(preco) || !url) {
        alert("Preencha todos os campos corretamente.");
        return null;
    }

    return { nome, descricao, preco, url };
}

function preencherFormulario(nomeId, descricaoId, precoId, urlId, comida) {
    document.getElementById(nomeId).value = comida.nome;
    document.getElementById(descricaoId).value = comida.descricao;
    document.getElementById(precoId).value = comida.preco;
    document.getElementById(urlId).value = comida.url;
}

// Fechar modal de exclusão
document.getElementById("cancelarExcluir").addEventListener("click", () => {
    document.getElementById("modalExcluir").close();
});
document.getElementById("confirmarExcluir").addEventListener("click", excluirComida);

// Chamada inicial para carregar as comidas
getAllComidas();
