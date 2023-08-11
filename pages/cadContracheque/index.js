function openModal(idUser) {
  const modal = document.getElementById("modalAusencia");

  const boton_foto = document.querySelector('#file');


  let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dkt07q4bz',
    uploadPreset: 'ml_default',
    language: "pt",  
    text: {

      "pt":{
        "or": "ou",
        "menu":{
          "files": "Meus arquivos"
        },
        "queue":{
          "title": "Seu arquivo",
          "done": "Enviar",
          "upload_more": "Enviar mais",
        },
        "local": {
          "browse": "Enviar arquivo",
          "dd_title_single": "Coloque seu arquivo aqui",
          "dd_title_multi": "Coloque seu arquivo aqui",
          "drop_title_single": "Drop a file to upload",
          "drop_title_multiple": "Drop files to upload"
        },
      }

    },
    sources: ['local'],
  }, (err, result) => {
    if (!err && result && result.event === 'success') {
      console.log('Imagen subida con éxito', result.info);
      let imagenSrc = result.info.secure_url;

      const dataAtual = new Date();

      const dia = dataAtual.getDate();
      const mes = dataAtual.getMonth() + 1;
      const ano = dataAtual.getFullYear();

      const dataFormatada = dia + "/" + mes + "/" + ano;

      sessionStorage.setItem("dataFormatada", dataFormatada);
      sessionStorage.setItem("imgUrl", imagenSrc);

      const formImage = document.getElementById("formImage")




    }
  });

  formImage.addEventListener('submit', (event) => {
    event.preventDefault();

    let dataFormatada = sessionStorage.getItem("dataFormatada")
    let imageUrl = sessionStorage.getItem("imgUrl")

    fetch(`https://api-yourdp.onrender.com/user/${idUser}/updateFinanceiro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contracheque: {
          diaArquivo: dataFormatada,
          arquivoContracheque: imageUrl
        }
      })
    })
      .then((res) => res.json())
      .then((data) => {


        alert("Ausencia cadastrada")


        if (data.msg) {
          alert(data.msg)
        } else {
          alert('Error ao cadastrar o ponto')
        }
      })
      .catch((err) => console.log(err))
  })



  boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
  }, false);


  modal.style.display = "block";
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById("modalAusencia");
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
    button.textContent = "Verificar";
    button.addEventListener("click", () => openModal(user._id));
    actionsCell.appendChild(button);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

// Chamar a função fetchUsers para buscar e exibir os usuários na tabela
fetchUsers();

