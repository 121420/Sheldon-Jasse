document.addEventListener('DOMContentLoaded', () => {
    // Lógica específica para o dashboard do aluno
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'student') {
        alert('Acesso negado. Por favor, faça login como aluno.');
        window.location.href = '../html/login.html';
        return;
    }

    console.log('Aluno logado. Carregando dados do aluno...');
    // - Aulas agendadas
    // - Professores favoritos
    // - Histórico de mensagens
    // - Notificações
});

// Enviar mensagem
document.addEventListener("DOMContentLoaded", () => {
    // Pré-preencher destinatário se vier pela URL
const urlParams = new URLSearchParams(window.location.search);
const destinatario = urlParams.get("destinatario");
if (destinatario && document.getElementById("receiver")) {
    document.getElementById("receiver").value = destinatario;
}

  const form = document.getElementById("messageForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();


      let messages = JSON.parse(localStorage.getItem("messages")) || [];
      messages.push({ sender, receiver, message, timestamp: new Date().toISOString() });
      localStorage.setItem("messages", JSON.stringify(messages));

      alert("Mensagem enviada com sucesso!");
      form.reset();
    });
  }

  // Mostrar mensagens recebidas
  const messageList = document.getElementById("messageList");
  if (messageList) {
    const user = localStorage.getItem("username");
    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    const userMessages = messages.filter(msg => msg.receiver === user);
    if (userMessages.length === 0) {
      messageList.innerHTML = "<p>Nenhuma mensagem nova.</p>";
    } else {
      messageList.innerHTML = userMessages.map(msg =>
        `<div class='message'><strong>De:</strong> ${msg.sender}<br>${msg.message}</div>`
      ).join("");
    }
  }
});
