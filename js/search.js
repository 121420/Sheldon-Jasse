// js/search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const teacherListings = document.getElementById('teacherListings');
    const resetFiltersButton = document.getElementById('resetFilters');

    // Adicionado mais dados para demonstração de filtros
    const teachers = [
        {
            id: 1,
            name: 'Prof. Ana Oliveira',
            subjects: ['Matemática', 'Física', 'Cálculo'],
            educationLevel: ['Ensino Secundário', 'Ensino Superior'],
            modality: 'online',
            location: '',
            rating: 4.8,
            price: 25,
            bio: 'Professora de Matemática e Física com 10 anos de experiência...',
            photo: '../img/foto20.jpg'
        },
        {
            id: 2,
            name: 'Prof. Pedro Costa',
            subjects: ['Inglês', 'Espanhol', 'Conversação'],
            educationLevel: ['Ensino Básico', 'Ensino Secundário', 'Idiomas'],
            modality: 'presencial',
            location: 'Lisboa',
            rating: 4.5,
            price: 20,
            bio: 'Professor de línguas dinâmico e apaixonado...',
            photo: '../img/foto12.jpg'
        },
        {
            id: 3,
            name: 'Dra. Sofia Lima',
            subjects: ['Química', 'Biologia', 'Bioquímica'],
            educationLevel: ['Ensino Secundário', 'Ensino Superior'],
            modality: 'online',
            location: '',
            rating: 4.9,
            price: 30,
            bio: 'Doutora em Química, com foco em aulas de reforço...',
            photo: '../img/foto19.jpg'
        },
        {
            id: 4,
            name: 'Mestre Carlos Gomes',
            subjects: ['História', 'Geografia', 'Filosofia'],
            educationLevel: ['Ensino Básico', 'Ensino Secundário'],
            modality: 'presencial',
            location: 'Porto',
            rating: 4.2,
            price: 22,
            bio: 'Aulas interativas para despertar o interesse na História...',
            photo: '../img/foto13.jpg'
        },
        {
            id: 5,
            name: 'Marta Vieira',
            subjects: ['Música', 'Piano', 'Teoria Musical'],
            educationLevel: ['Ensino Básico', 'Ensino Secundário', 'Música'],
            modality: 'online',
            location: '',
            rating: 4.7,
            price: 35,
            bio: 'Pianista e professora de música com paixão por ensinar.',
            photo: '../img/foto17.jpeg'
        },
        {
            id: 6,
            name: 'Ricardo Santos',
            subjects: ['Desenho', 'Pintura', 'Design'],
            educationLevel: ['Ensino Superior', 'Artes'],
            modality: 'presencial',
            location: 'Coimbra',
            rating: 4.6,
            price: 28,
            bio: 'Artista visual e professor com workshops criativos.',
            photo: '../img/foto14.jpg'
        }
    ];

    function renderTeachers(filteredTeachers) {
        teacherListings.innerHTML = ''; // Limpa resultados anteriores

        if (filteredTeachers.length === 0) {
            teacherListings.innerHTML = '<p>Nenhum professor encontrado com os critérios selecionados.</p>';
            return;
        }

        filteredTeachers.forEach(teacher => {
            const teacherCard = document.createElement('div');
            teacherCard.classList.add('teacher-card');
            const isFavorite = isTeacherFavorite(teacher.id); // Função de favorites.js

            teacherCard.innerHTML = `
                <img src="${teacher.photo}" alt="${teacher.name}">
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    <p><strong>Disciplinas:</strong> ${teacher.subjects.join(', ')}</p>
                    <p><strong>Nível de Ensino:</strong> ${teacher.educationLevel.join(', ')}</p>
                    <p><strong>Modalidade:</strong> ${teacher.modality === 'online' ? 'Online' : 'Presencial'}</p>
                    ${teacher.modality === 'presencial' && teacher.location ? `<p><strong>Localização:</strong> ${teacher.location}</p>` : ''}
                    <p><strong>Classificação:</strong> ⭐ ${teacher.rating}</p>
                    <p><strong>Preço:</strong> ${teacher.price}€/h</p>
                    <p class="teacher-bio">${teacher.bio.substring(0, 100)}...</p>
                    <div class="teacher-actions">
                        <button onclick="viewTeacherProfile(${teacher.id})">Ver Perfil</button>
                        <button class="favorite-button ${isFavorite ? 'favorited' : ''}" data-teacher-id="${teacher.id}">
                            ${isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                        </button>
                    </div>
                </div>
            `;
            teacherListings.appendChild(teacherCard);
        });

        // Adiciona event listeners para os botões de favorito
        document.querySelectorAll('.favorite-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const teacherId = parseInt(event.target.dataset.teacherId);
                toggleFavorite(teacherId); // Função de favorites.js
                // Re-renderiza a lista para atualizar o estado dos botões de favorito
                applyFilters(); // Chama a função que aplica os filtros e renderiza
            });
        });
    }

    function applyFilters() {
        const subject = document.getElementById('subject').value.toLowerCase();
        const educationLevel = document.getElementById('educationLevel').value;
        const modality = document.getElementById('modality').value;
        const location = document.getElementById('location').value.toLowerCase();
        const minRating = parseFloat(document.getElementById('rating').value);
        const maxPrice = parseInt(document.getElementById('priceRange').value);


        let filteredTeachers = teachers.filter(teacher => {
            const matchesSubject = subject ? teacher.subjects.some(s => s.toLowerCase().includes(subject)) : true;
            const matchesEducationLevel = educationLevel ? teacher.educationLevel.includes(educationLevel) : true;
            const matchesModality = modality ? teacher.modality === modality : true;
            const matchesLocation = location ? (teacher.modality === 'presencial' && teacher.location.toLowerCase().includes(location)) : true;
            const matchesRating = teacher.rating >= minRating;
            const matchesPrice = teacher.price <= maxPrice;

            return matchesSubject && matchesEducationLevel && matchesModality && matchesLocation && matchesRating && matchesPrice;
        });

        renderTeachers(filteredTeachers);
    }


    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            applyFilters();
        });
    }

    if (resetFiltersButton) {
        resetFiltersButton.addEventListener('click', () => {
            // Reseta os valores dos campos do formulário
            document.getElementById('subject').value = '';
            document.getElementById('educationLevel').value = '';
            document.getElementById('modality').value = '';
            document.getElementById('location').value = '';
            document.getElementById('rating').value = '0';
            document.getElementById('priceRange').value = '50';
            document.getElementById('priceValue').innerText = '50';

            // Aplica os filtros novamente 
            applyFilters();
        });
    }

    // Função para ver o perfil do professor
    window.viewTeacherProfile = (teacherId) => {
        // Redireciona para a página de perfil do professor com o ID
        window.location.href = `../html/teacher-profile.html?id=${teacherId}`;
    };

    // Carrega sugestões de professores (todos os professores inicialmente)
    applyFilters();
});
