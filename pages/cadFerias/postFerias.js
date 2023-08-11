// Função para abrir o modal e exibir o ID do usuário
function openModal(nameUser, idUser) {
  const modal = document.getElementById("modalFerias");

  document.getElementById("nameUser").innerHTML = nameUser

  document.getElementById('inicio').addEventListener('change', calcularDiferenca);
  document.getElementById('fim').addEventListener('change', calcularDiferenca);

  

  function calcularDiferenca() {
    var date1 = new Date(document.getElementById('inicio').value);
    var date2 = new Date(document.getElementById('fim').value);

    var dataInicio = document.getElementById('inicio').value;
   

    var dataFim = document.getElementById('fim').value
    

    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    sessionStorage.setItem("dias", diffDays);
    sessionStorage.setItem("dataInicio", dataInicio);
    sessionStorage.setItem("dataFim", dataFim)

    document.getElementById('diasFerias').innerHTML = 'dias:' + diffDays == NaN ? "calculando..." : diffDays;
  }

  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let dias = sessionStorage.getItem("dias")
    let dataInicio = sessionStorage.getItem("dataInicio")
    let dataFim = sessionStorage.getItem("dataFim")

    try {
      fetch(`https://api-yourdp.onrender.com/user/${idUser}/updateFerias`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ferias: {
            inicio: dataInicio,
            fim: dataFim,
            status: true,
            dias: dias
          }
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            alert('Form data successfully')


          }
          if (data.msg) {
            alert(data.msg);
          }

        })
    } catch (err) {
      console.error(err);
    }

  })






  modal.style.display = "block";
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById("modalFerias");
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
    button.textContent = "Cadastrar";
    button.addEventListener("click", () => openModal(user.name, user._id));
    actionsCell.appendChild(button);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

// Chamar a função fetchUsers para buscar e exibir os usuários na tabela
fetchUsers();

