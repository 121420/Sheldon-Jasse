document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            // para autenticar o usuário e obter um token de sessão.
            console.log(`Tentativa de login: Email=${email}, Role=${role}`);

            // Simulação de autenticação bem-sucedida 
            let isAuthenticated = false;
            if (email === 'Esmad@gmail.com' && password === '1234567890' && role === 'student') {
                isAuthenticated = true;
                localStorage.setItem('userRole', 'student');
                localStorage.setItem('userEmail', email);
                window.location.href = '../html/students-dashboard.html';
            } else if (email === 'professor@gmail.com' && password === '1234567890' && role === 'teacher') {
                isAuthenticated = true;
                localStorage.setItem('userRole', 'teacher');
                localStorage.setItem('userEmail', email);
                window.location.href = '../html/teachers-dashboard.html';
            } else if (email === 'admin@gmail.com' && password === 'admin123' && role === 'admin') {
                isAuthenticated = true;
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userEmail', email);
                window.location.href = '../html/admin-dashboard.html';
            } else {
                loginMessage.textContent = 'Credenciais inválidas ou tipo de utilizador incorreto.';
                isAuthenticated = false;
            }
        });
    }

    // Função de logout 
    window.logout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        window.location.href = '../html/login.html'; // Redireciona para a página de login
    };
});