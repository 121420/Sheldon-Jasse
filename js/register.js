document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.getElementById('registerRole').value;

            // Limpa mensagens anteriores
            registerMessage.textContent = '';
            registerMessage.classList.remove('error-message', 'success-message');

            // Validações básicas do frontend
            if (password !== confirmPassword) {
                registerMessage.textContent = 'As passwords não coincidem.';
                registerMessage.classList.add('error-message');
                return;
            }

            if (password.length < 6) {
                registerMessage.textContent = 'A password deve ter pelo menos 6 caracteres.';
                registerMessage.classList.add('error-message');
                return;
            }

            // para enviar os dados e esperar uma resposta.
            console.log(`Tentativa de registo: Nome=${fullName}, Email=${email}, Role=${role}`);

            // Para esta simulação, assumimos sucesso
            registerMessage.textContent = 'Registo bem-sucedido! Redirecionando para o login...';
            registerMessage.classList.add('success-message');
            registerForm.reset(); // Limpa o formulário

            // Redireciona para a página de login após um pequeno atraso
            setTimeout(() => {
                window.location.href = '../html/login.html';
            }, 2000); // Redireciona após 2 segundos
        });
    }
});