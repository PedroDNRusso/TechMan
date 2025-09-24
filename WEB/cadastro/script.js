document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#cadastro');
    const password = document.querySelector("#senha");
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const senha = form.senha.value.trim();

        if (!/^\d{6}$/.test(senha)) {
            messageDiv.textContent = "A senha deve ter exatamente 6 dígitos!";
            messageDiv.className = "message error";
            return;
        }

        const dados = { 
            senha: parseInt(senha), 
            tipo: "CLIENTE"           
        };

        fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
        .then(resp => {
        if (resp.status === 201) {
                messageDiv.textContent = "Cadastro feito com sucesso!";
                messageDiv.className = "message success";
                form.reset();
        } else {
                messageDiv.textContent = "Erro ao cadastrar!";
                messageDiv.className = "message error";
        }
            return resp.json();
        })
        .catch(err => {
            messageDiv.textContent = "Erro ao conectar com a API!";
            messageDiv.className = "message error";
            console.error(err);
        });
    });
});
