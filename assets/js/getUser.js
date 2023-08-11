
// Função para abrir o modal e exibir o ID do usuário
function openModal(pontos) {
  const modal = document.getElementById("modalPoint");
 
  const tableBody = document.querySelector("#idTable tbody");
  tableBody.innerHTML = "";

  pontos.forEach(ponto => {
    const row = document.createElement("tr");

    const dia = document.createElement("td");
    dia.textContent = ponto.data;
    row.appendChild(dia);

    const pontoEntrada = document.createElement("td");
    pontoEntrada.textContent = ponto.entrada;
    row.appendChild(pontoEntrada);

    const pontoIntervalo = document.createElement("td");
    pontoIntervalo.textContent = ponto.intervalo === null ? "Sem valor" : ponto.intervalo;
    row.appendChild(pontoIntervalo);

    const pontoVolta = document.createElement("td");
    pontoVolta.textContent = ponto.volta === null ? "Sem valor" : ponto.volta;
    row.appendChild(pontoVolta);

    const pontoSaida = document.createElement("td");
    pontoSaida.textContent = ponto.saida;
    row.appendChild(pontoSaida);

    tableBody.appendChild(row);
  })

  
  modal.style.display = "block";
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById("modalPoint");
  modal.style.display = "none";
}

// Função para buscar e exibir os usuários na tabela
async function fetchUsers() {
  const response = await fetch('https://api-yourdp.onrender.com/users');
  const users = await response.json();

  const tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = users.indexOf(user) + 1;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const actionsCell = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "Mostrar";
    button.addEventListener("click", () => openModal(user.ponto));
    actionsCell.appendChild(button);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

// Chamar a função fetchUsers para buscar e exibir os usuários na tabela
fetchUsers();

