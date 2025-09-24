document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (!usuario) {
        alert("Você precisa estar logado para acessar esta página!");
        window.location.href = "../login/index.html";
        return;
    }

    // === BOTÃO LOGOUT ===
    const topbar = document.querySelector(".topbar");
    const btnLogout = document.createElement("button");
    btnLogout.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
    btnLogout.classList.add("logout-btn");
    btnLogout.onclick = () => {
        sessionStorage.removeItem("usuarioLogado");
        window.location.href = "../login/index.html";
    };
    topbar.appendChild(btnLogout);

    // === PERMISSÕES: ADMIN PODE VER O BOTÃO NOVO ===
    const btnNovo = document.querySelector(".novo-equip");
    if (usuario.perfilId !== 2) { 
        btnNovo.style.display = "none";
    }

    carregarEquipamentos(usuario);
    configurarModal(usuario);
});

async function carregarEquipamentos(usuario) {
    try {
        const response = await fetch("http://localhost:3000/equipamentos");
        const dados = await response.json();

        const lista = document.getElementById("lista-equipamentos");
        lista.innerHTML = "";

        dados.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${item.imagem}" alt="${item.equipamento}">
                <div class="card-content">
                    <h3>${item.equipamento}</h3>
                    <p>${item.descricao}</p>
                    <div class="card-footer">
                        <button title="Comentários" onclick="abrirComentarios(${item.id}, '${item.equipamento}')">
                            <i class="fas fa-comments"></i>
                        </button>
                        ${usuario.perfilId === 2 ? `
                            <button title="Excluir" onclick="deletarEquipamento(${item.id})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        ` : ""}
                    </div>
                </div>
            `;
            lista.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar equipamentos:", error);
        alert("Erro ao carregar equipamentos do servidor!");
    }
}

async function deletarEquipamento(id) {
    try {
        if (!confirm("Deseja realmente excluir este equipamento?")) return;

        const response = await fetch(`http://localhost:3000/equipamentos/${id}`, {
            method: "DELETE"
        });

        if (response.status === 204) {
            alert("Equipamento deletado com sucesso!");
            carregarEquipamentos(JSON.parse(sessionStorage.getItem("usuarioLogado")));
        } else {
            alert("Erro ao deletar equipamento!");
        }
    } catch (err) {
        console.error("Erro ao deletar equipamento:", err);
    }
}

function configurarModal(usuario) {
    const modal = document.getElementById("modal");
    const btnNovo = document.querySelector(".novo-equip");
    const spanClose = document.querySelector(".close");
    const formEquip = document.getElementById("form-equipamento");

    // Só admin abre modal
    if (usuario.perfilId === 2) {
        btnNovo.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "block";
        });
    }

    spanClose.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

    // Só admin cadastra
    formEquip.addEventListener("submit", async (e) => {
        if (usuario.perfilId !== 2) {
            alert("Apenas administradores podem cadastrar equipamentos!");
            return;
        }

        e.preventDefault();
        const formData = new FormData(formEquip);
        const dados = {
            equipamento: formData.get("equipamento"),
            imagem: formData.get("imagem"), 
            descricao: formData.get("descricao")
        };

        try {
            const response = await fetch("http://localhost:3000/equipamentos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (response.status === 201) {
                alert("Equipamento cadastrado com sucesso!");
                modal.style.display = "none";
                formEquip.reset();
                carregarEquipamentos(usuario);
            } else {
                alert("Erro ao cadastrar equipamento!");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor!");
        }
    });
}

async function abrirComentarios(equipamentoId, equipamentoNome) {
    const modalComentarios = document.createElement("div");
    modalComentarios.classList.add("modal");
    modalComentarios.style.display = "block";
    modalComentarios.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Comentários - ${equipamentoNome}</h2>
            <div id="lista-comentarios" style="max-height:300px;overflow-y:auto;margin-bottom:10px;"></div>
            <form id="form-comentario">
                <textarea name="comentario" rows="3" placeholder="Digite seu comentário..." required></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    `;
    document.body.appendChild(modalComentarios);

    const spanClose = modalComentarios.querySelector(".close");
    spanClose.addEventListener("click", () => modalComentarios.remove());
    window.addEventListener("click", (e) => { if(e.target === modalComentarios) modalComentarios.remove(); });

    const listaComentarios = document.getElementById("lista-comentarios");
    const formComentario = modalComentarios.querySelector("#form-comentario");
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    async function carregarComentarios() {
        try {
            const response = await fetch(`http://localhost:3000/comentarios?equipamentoId=${equipamentoId}`);
            const comentarios = await response.json();
            listaComentarios.innerHTML = "";
            comentarios.forEach(c => {
                const div = document.createElement("div");
                div.style.borderBottom = "1px solid #ccc";
                div.style.padding = "5px 0";
                div.textContent = `[${new Date(c.data).toLocaleString()}] Usuário ${c.usuarioId}: ${c.comentario}`;
                listaComentarios.appendChild(div);
            });
        } catch (err) {
            console.error("Erro ao carregar comentários:", err);
        }
    }

    await carregarComentarios();

    formComentario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(formComentario);
        const dados = {
            comentario: formData.get("comentario"),
            equipamentoId,
            usuarioId: usuario.id
        };

        try {
            const response = await fetch("http://localhost:3000/comentarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (response.status === 201) {
                formComentario.reset();
                await carregarComentarios();
            } else {
                alert("Erro ao enviar comentário!");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor!");
        }
    });
}
