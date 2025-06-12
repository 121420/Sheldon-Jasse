document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
        alert('Acesso negado. Por favor, faça login como administrador.');
        window.location.href = '../html/login.html';
        return;
    }

    console.log('Admin logado. Carregando dados de utilizadores...');

    // Simulação de dados de utilizadores 
    const users = {
        students: [
            { id: 1, name: 'Ana Silva', email: 'ana.silva@gmail.com' },
            { id: 2, name: 'Bruno Costa', email: 'bruno.costa@gmail.com' }
        ],
        teachers: [
            { id: 101, name: 'Dr. João Pereira', email: 'joao.pereira@gmail.com', subjects: ['Matemática', 'Física'] },
            { id: 102, name: 'Prof. Maria Santos', email: 'maria.santos@gmail.com', subjects: ['Português', 'Literatura'] }
        ]
    };

    const studentList = document.getElementById('studentList');
    const teacherList = document.getElementById('teacherList');

    function renderUsers() {
        // Limpa listas
        studentList.innerHTML = '';
        teacherList.innerHTML = '';

        // Renderiza alunos
        users.students.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${student.name} (${student.email})</span>
                <button onclick="editUser(${student.id}, 'student')">Editar</button>
                <button onclick="deleteUser(${student.id}, 'student')">Eliminar</button>
            `;
            studentList.appendChild(li);
        });

        // Renderiza professores
        users.teachers.forEach(teacher => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${teacher.name} (${teacher.email}) - ${teacher.subjects.join(', ')}</span>
                <button onclick="editUser(${teacher.id}, 'teacher')">Editar</button>
                <button onclick="deleteUser(${teacher.id}, 'teacher')">Eliminar</button>
            `;
            teacherList.appendChild(li);
        });
    }

    // Funções de exemplo para gestão de utilizadores 
    window.editUser = (id, type) => {
        alert(`Editar ${type} com ID: ${id}`);
        // Implementar modal ou página de edição
    };

    window.deleteUser = (id, type) => {
        if (confirm(`Tem certeza que deseja eliminar este ${type}?`)) {
            // Lógica para chamar o backend e remover o utilizador
            alert(`${type} com ID ${id} eliminado (simulação).`);
            // Atualizar a lista após a eliminação 
            if (type === 'student') {
                users.students = users.students.filter(s => s.id !== id);
            } else if (type === 'teacher') {
                users.teachers = users.teachers.filter(t => t.id !== id);
            }
            renderUsers(); // Renderiza a lista atualizada
        }
    };

    renderUsers(); // Carrega os utilizadores ao iniciar
});