
var table = document.getElementById("tableUser")



function handleShowTable(data, item) {
  return `
  
    <tr>
		  <th scope="row">${data.indexOf(item) + 1}</th>
				<td>${item.name}</td>
				<td>${item.email}</td>
				<td>
          <button type="button"  onclick="showModal(${JSON.stringify(item.ponto)})"><i class="uil uil-plus icon"></i></button>
        </td>
		</tr>
  `
}

var modalPoint = document.getElementById("modalPoint");

var closeModal = document.getElementById('closeModal');

closeModal.addEventListener('click', () => {
  var modalPoint = document.getElementById("modalPoint");
  modalPoint.classList.remove("active")
})

function showModal(data){
  modalPoint.classList.add("active")

  console.log(data)
  let tablePoint = document.getElementById("tablePoint")

  data.map((item) => {
    tablePoint.innerHTML += `
    
    <tr>
      <td>${item.data}</td>
      <td>${item.entrada}</td>
      <td>${item.intervalo !== null ? item.intervalo : 'valor vazio'}</td>
      <td>${item.volta !== null ? item.intervalo : 'valor vazio'}</td>
      <td>${item.saida}</td>
    </tr>
    
    `
  })

}





try {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      data.map((user) => {
        table.innerHTML += handleShowTable(data, user)

       
       
      })

     

    })

} catch (err) {
  console.log(err);
  alert("Não foi possivel achar os usuaios")
}