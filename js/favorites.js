// favorites.js

function getFavoriteTeachers() {
    const favorites = localStorage.getItem('favoriteTeachers');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavoriteTeachers(favorites) {
    localStorage.setItem('favoriteTeachers', JSON.stringify(favorites));
}

function isTeacherFavorite(teacherId) {
    const favorites = getFavoriteTeachers();
    return favorites.includes(teacherId);
}

function addFavorite(teacherId) {
    const favorites = getFavoriteTeachers();
    if (!favorites.includes(teacherId)) {
        favorites.push(teacherId);
        saveFavoriteTeachers(favorites);
        alert('Professor adicionado aos favoritos!');
    }
}

function removeFavorite(teacherId) {
    let favorites = getFavoriteTeachers();
    favorites = favorites.filter(id => id !== teacherId);
    saveFavoriteTeachers(favorites);
    alert('Professor removido dos favoritos!');
}

function toggleFavorite(teacherId) {
    if (isTeacherFavorite(teacherId)) {
        removeFavorite(teacherId);
    } else {
        addFavorite(teacherId);
    }
}

// ----- Renderização da lista de favoritos (antes estava no favorites.html) -----

document.addEventListener('DOMContentLoaded', () => {
    const favoriteTeachersListings = document.getElementById('favoriteTeachersListings');

    // Simulação de dados de professores (deve ser o mesmo array em search.js)
    const allTeachers = [
        {
            id: 1, name: 'Prof. Ana Oliveira', subjects: ['Matemática', 'Física'], educationLevel: ['Ensino Secundário', 'Ensino Superior'], modality: 'online', location: '', rating: 4.8, price: 25, bio: 'Professora de Matemática e Física com 10 anos de experiência...', photo: '../img/foto20.jpg'
        },
        {
            id: 2, name: 'Prof. Pedro Costa', subjects: ['Inglês', 'Espanhol'], educationLevel: ['Ensino Básico', 'Ensino Secundário', 'Idiomas'], modality: 'presencial', location: 'Lisboa', rating: 4.5, price: 20, bio: 'Professor de línguas dinâmico e apaixonado...', photo: '../img/foto12.jpg'
        },
        {
            id: 3, name: 'Dra. Sofia Lima', subjects: ['Química', 'Biologia'], educationLevel: ['Ensino Secundário', 'Ensino Superior'], modality: 'online', location: '', rating: 4.9, price: 30, bio: 'Doutora em Química, com foco em aulas de reforço...', photo: '../img/foto19.jpg'
        },
        {
            id: 4, name: 'Mestre Carlos Gomes', subjects: ['História', 'Geografia'], educationLevel: ['Ensino Básico', 'Ensino Secundário'], modality: 'presencial', location: 'Porto', rating: 4.2, price: 22, bio: 'Aulas interativas para despertar o interesse na História...', photo: '../img/foto13.jpg'
        },
        {
            id: 5, name: 'Marta Vieira', subjects: ['Música', 'Piano'], educationLevel: ['Ensino Básico', 'Ensino Secundário', 'Música'], modality: 'online', location: '', rating: 4.7, price: 35, bio: 'Pianista e professora de música com paixão por ensinar.', photo: '../img/foto17.jpg'
        },
        {
            id: 6, name: 'Ricardo Santos', subjects: ['Desenho', 'Pintura'], educationLevel: ['Ensino Superior', 'Artes'], modality: 'presencial', location: 'Coimbra', rating: 4.6, price: 28, bio: 'Artista visual e professor com workshops criativos.', photo: '../img/foto14.jpg'
        }
    ];

    function renderFavoriteTeachers() {
        favoriteTeachersListings.innerHTML = '';
        const favoriteIds = getFavoriteTeachers();

        if (favoriteIds.length === 0) {
            favoriteTeachersListings.innerHTML = '<p>Você ainda não adicionou nenhum professor aos favoritos. Procure por professores <a href="teachers-listing.html">aqui</a> e adicione os seus preferidos!</p>';
            return;
        }

        const filteredFavorites = allTeachers.filter(teacher => favoriteIds.includes(teacher.id));

        if (filteredFavorites.length === 0) {
            favoriteTeachersListings.innerHTML = '<p>Os seus professores favoritos não foram encontrados na lista atual. Isso pode ocorrer se os dados forem atualizados. Tente adicioná-los novamente.</p>';
            return;
        }

        filteredFavorites.forEach(teacher => {
            const teacherCard = document.createElement('div');
            teacherCard.classList.add('teacher-card');

            teacherCard.innerHTML = `
                <img src="${teacher.photo}" alt="${teacher.name}">
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    <p><strong>Disciplinas:</strong> ${teacher.subjects.join(', ')}</p>
                    <p><strong>Classificação:</strong> ⭐ ${teacher.rating}</p>
                    <p class="teacher-bio">${teacher.bio.substring(0, 100)}...</p>
                    <div class="teacher-actions">
                        <button onclick="viewTeacherProfile(${teacher.id})">Ver Perfil</button>
                        <button class="favorite-button favorited" data-teacher-id="${teacher.id}">Remover dos Favoritos</button>
                    </div>
                </div>
            `;
            favoriteTeachersListings.appendChild(teacherCard);
        });

        // Adiciona eventos aos botões de remoção
        document.querySelectorAll('.favorite-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const teacherId = parseInt(event.target.dataset.teacherId);
                removeFavorite(teacherId);
                renderFavoriteTeachers();
            });
        });
    }

    window.viewTeacherProfile = (teacherId) => {
        window.location.href = `../html/teacher-profile.html?id=${teacherId}`;
    };

    renderFavoriteTeachers();
});
