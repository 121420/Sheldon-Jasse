document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'teacher') {
        alert('Acesso negado. Por favor, faça login como professor.');
        window.location.href = '../html/login.html';
        return;
    }

    console.log('Professor logado. Carregando dados do professor...');
    // - Horário de aulas
    // - Pedidos de aulas
    // - Mensagens de alunos
    // - Informações do perfil para edição
});

// Enviar mensagem
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("messageForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const receiver = document.getElementById("receiver").value;
      const message = document.getElementById("message").value;
      const sender = localStorage.getItem("username") || "Desconhecido";

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
