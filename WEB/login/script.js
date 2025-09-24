const passwordDisplay = document.getElementById('passwordDisplay');
const buttons = document.querySelectorAll('.keypad button');

let senha = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            senha = '';
        } else if (value === '↩') {
            senha = senha.slice(0, -1);
        } else if (senha.length < 6) {
            senha += value;
        }

        passwordDisplay.textContent = '*'.repeat(senha.length);

        if (senha.length === 6) {
            login();
        }
    });
});

async function login() {
    try {
        const response = await fetch('http://localhost:3000/usuarioslgn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha })
        });

        const data = await response.json();

        if (response.status === 200) {
            sessionStorage.setItem('usuarioLogado', JSON.stringify(data));
            window.location.href = '../ui/index.html';
        } else {
            alert(data.message || 'Senha incorreta!');
            senha = '';
            passwordDisplay.textContent = '';
        }
    } catch (err) {
        console.error('Erro ao conectar com a API:', err);
        alert('Erro ao conectar com o servidor.');
        senha = '';
        passwordDisplay.textContent = '';
    }
}
