// Função para calcular a diferença de dias até o próximo dia 10 ou 15
function calculateDaysToDate(targetDay) {
    const today = new Date();
    let targetDate = new Date(today.getFullYear(), today.getMonth(), targetDay);

    // Se a data atual for após o dia alvo (10 ou 15), calcular para o próximo mês
    if (today.getDate() > targetDay) {
        targetDate = new Date(today.getFullYear(), today.getMonth() + 1, targetDay);
    }

    // Ajustar para o caso de sábado ou domingo
    const dayOfWeek = targetDate.getDay();
    if (dayOfWeek === 6) { // Sábado
        targetDate.setDate(targetDay - 1); // Ajusta para o dia anterior
    } else if (dayOfWeek === 0) { // Domingo
        targetDate.setDate(targetDay + 1); // Ajusta para o dia seguinte
    }

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

// Função para atualizar o resultado com a cor do fundo
function updateResult(targetDay) {
    const resultDiv = document.getElementById("result");
    const daysLeft = calculateDaysToDate(targetDay);
    const body = document.body;

    // Oculta os botões
    document.getElementById("pjBtn").style.display = "none";
    document.getElementById("coopBtn").style.display = "none";

    // Exibe o botão de voltar
    document.getElementById("backBtn").style.display = "inline-block";

    // Criação do emoji
    let emoji = '';
    
    if (daysLeft === 0) {
        emoji = '💰';  // Emoji para o dia do evento
    } else if (daysLeft <= 3) {
        emoji = '🤑';  // Emoji para menos de 3 dias
    } else if (daysLeft <= 10) {
        emoji = '😰';  // Emoji para menos de 10 dias
    } else if (daysLeft => 20) {
        emoji = '☠️';  // Emoji para mais de 20 dias
    }

    // Atualiza o fundo da página conforme os dias restantes
    if (daysLeft <= 3) {
        body.className = 'green';
    } else if (daysLeft <= 10) {
        body.className = 'limegreen';
    } else if (daysLeft <= 20) {
        body.className = 'yellow';
    } else {
        body.className = 'red';
    }

    // Atualiza o texto com o emoji centralizado
    resultDiv.innerHTML = `
        <div class="emoji">${emoji}</div>
        <div>${daysLeft === 0 ? 'Façam o <s>pix</s> envio de cédulas físicas imediatamente!' : `Faltam ${daysLeft} dias para o pagode`}</div>
    `;
    resultDiv.style.display = "block";
}

// Evento do botão PJ
document.getElementById("pjBtn").addEventListener("click", function() {
    updateResult(10);  // Cálculo para o dia 10
});

// Evento do botão Coop
document.getElementById("coopBtn").addEventListener("click", function() {
    updateResult(15);  // Cálculo para o dia 15
});

// Evento do botão Voltar
document.getElementById("backBtn").addEventListener("click", function() {
    // Volta para a tela inicial
    document.getElementById("result").style.display = "none";
    document.getElementById("backBtn").style.display = "none";

    // Exibe novamente os botões PJ e Coop
    document.getElementById("pjBtn").style.display = "inline-block";
    document.getElementById("coopBtn").style.display = "inline-block";

    // Reseta o fundo
    document.body.className = '';
});
