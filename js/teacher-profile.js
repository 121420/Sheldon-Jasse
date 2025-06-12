document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teacherId = parseInt(urlParams.get('id'));
    const teacherProfileContainer = document.getElementById('teacherProfile');

    const teachers =
            [
                {

                    id: 1,
                    name: 'Prof. Ana Oliveira',
                    subjects: ['Matemática', 'Física'],
                    educationLevel: ['Ensino Secundário', 'Ensino Superior'],
                    modality: 'online',
                    location: '',
                    rating: 4.8,
                    bio: 'Professora experiente de Matemática e Física com foco em preparações para exames e reforço escolar. Adoto uma metodologia de ensino personalizada para cada aluno, garantindo a compreensão dos conceitos mais complexos. Tenho mais de 10 anos de experiência e adoro ver os meus alunos alcançarem os seus objetivos. As aulas online são realizadas numa plataforma interativa.',
                    photo: '../img/foto20.jpg',
                    availability: 'Seg-Sex: 10h-18h',
                    price: '25€/hora'
                },
                {
                    id: 2,
                    name: 'Prof. Pedro Costa',
                    subjects: ['Inglês', 'Espanhol'],
                    educationLevel: ['Ensino Básico', 'Ensino Secundário', 'Idiomas'],
                    modality: 'presencial',
                    location: 'Lisboa',
                    rating: 4.5,
                    bio: 'Professor de línguas dinâmico e apaixonado por ensinar. Ajudo alunos de todas as idades a desenvolverem fluência e confiança em inglês e espanhol, seja para escola, trabalho ou viagens. Aulas personalizadas e focadas na conversação. Disponibilidade para aulas presenciais em Lisboa.',
                    photo: '../img/foto12.jpg',
                    availability: 'Ter-Qui: 14h-20h, Sáb: 9h-13h',
                    price: '20€/hora'
                },
                {
                    id: 3,
                    name: 'Dra. Sofia Lima',
                    subjects: ['Química', 'Biologia'],
                    educationLevel: ['Ensino Secundário', 'Ensino Superior'],
                    modality: 'online',
                    location: '',
                    rating: 4.9,
                    bio: 'Doutora em Química, com vasta experiência em aulas de reforço e preparação para universidades. Minha paixão é desmistificar a Química e a Biologia, tornando-as acessíveis e interessantes. Ofereço apoio completo, desde a teoria até a resolução de exercícios complexos. Aulas totalmente online, com recursos didáticos digitais.',
                    photo: '../img/foto19.jpg',
                    availability: 'Seg-Sex: 17h-21h',
                    price: '30€/hora'
                },
                {
                    id: 4,
                    name: 'Mestre Carlos Gomes',
                    subjects: ['História', 'Geografia'],
                    educationLevel: ['Ensino Básico', 'Ensino Secundário'],
                    modality: 'presencial',
                    location: 'Porto',
                    rating: 4.2,
                    bio: 'Aulas interativas para despertar o interesse na História e Geografia. Com mais de 15 anos de experiência, utilizo recursos visuais e discussões dinâmicas para tornar o aprendizado envolvente. Disponível para aulas presenciais no Porto.',
                    photo: '../img/foto13.jpg',
                    availability: 'Seg-Sex: 9h-17h',
                },
                {
                    id: 4,
                    name: 'Marta Vieira',
                    subjects: ['Música', 'Piano'],
                    educationLevel: ['Ensino Básico', 'Ensino Secundário', 'Música'],
                    modality: 'online',
                    location: '',
                    rating: 4.7,
                    bio: 'Pianista e professora de música com paixão por ensinar. Ofereço aulas de piano para iniciantes e avançados, focando na técnica, teoria musical e interpretação. As aulas são online, adaptadas ao nível do aluno e aos seus objetivos musicais. Tenho mais de 10 anos de experiência no ensino musical.',
                    photo: '../img/foto14.jpg',
                    availability: 'Seg-Sex: 17h-21h',
                    price: '30€/hora'
                }
            ];

            const teacher = teachers.find(t => t.id === teacherId);

    if (teacher) {
        const isFavorite = isTeacherFavorite(teacher.id);
        teacherProfileContainer.innerHTML = `
            <img src="${teacher.photo}" alt="Foto de ${teacher.name}">
            <h2>${teacher.name}</h2>
            <p>⭐ ${teacher.rating} de classificação</p>
            <p><strong>Disciplinas:</strong> ${teacher.subjects.join(', ')}</p>
            <p><strong>Nível de Ensino:</strong> ${teacher.educationLevel.join(', ')}</p>
            <p><strong>Modalidade:</strong> ${teacher.modality === 'online' ? 'Online' : 'Presencial'}</p>
            ${teacher.modality === 'presencial' && teacher.location ? `<p><strong>Localização:</strong> ${teacher.location}</p>` : ''}
            <p><strong>Disponibilidade:</strong> ${teacher.availability}</p>
            <p><strong>Preço:</strong> ${teacher.price}</p>
            <p class="bio"><strong>Sobre Mim:</strong> ${teacher.bio}</p>
            <div class="actions">
                <button class="contact-button" data-id="${teacher.id}" data-name="${teacher.name}">Contactar Professor</button>
                <button class="favorite-button ${isFavorite ? 'favorited' : ''}" data-teacher-id="${teacher.id}">
                    ${isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
            </div>
        `;

        // Botão de contacto
        document.querySelector('.contact-button').addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            window.location.href = "student-messages.html?destinatario=" + encodeURIComponent(name);
        });

        // Botão de favoritos
        document.querySelector('.favorite-button').addEventListener('click', (event) => {
            toggleFavorite(teacher.id);
            const button = event.target;
            if (isTeacherFavorite(teacher.id)) {
                button.textContent = 'Remover dos Favoritos';
                button.classList.add('favorited');
            } else {
                button.textContent = 'Adicionar aos Favoritos';
                button.classList.remove('favorited');
            }
        });

    } else {
        teacherProfileContainer.innerHTML = '<p>Professor não encontrado.</p>';
    }
});

            // ... depois de preencher o profile
teacherProfileContainer.innerHTML += `
    <button id="contactTeacherBtn">Contactar Professor</button>
`;

// Adiciona comportamento ao botão
if (teacher) {
    const contactButton = document.createElement("button");
    contactButton.id = "contactTeacherBtn";
    contactButton.textContent = "Contactar Professor";
    contactButton.addEventListener("click", () => {
        window.location.href = "../html/student-messages.html?destinatario=" + encodeURIComponent(teacher.name);
    });

    teacherProfileContainer.appendChild(contactButton);
}

