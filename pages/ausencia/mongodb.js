// Dados de exemplo (pode ser obtido do servidor)
var ausencias = [
  { id: 1, nome: 'Funcionário 1', data: '2023-06-20', status: 'Pendente', motivo: 'Motivo 1', observacao: 'Observação 1' },
  { id: 2, nome: 'Funcionário 2', data: '2023-06-15', status: 'Aprovado', motivo: 'Motivo 2', observacao: 'Observação 2' },
  { id: 3, nome: 'Funcionário 3', data: '2023-06-10', status: 'Rejeitado', motivo: 'Motivo 3', observacao: 'Observação 3' }
];

// Função para adicionar as ausências na tabela
function exibirAusencias() {
  var tableBody = document.getElementById('tableBody');

  // Limpar a tabela antes de adicionar as ausências
  tableBody.innerHTML = '';

  // Adicionar cada ausência à tabela
  ausencias.forEach(function(ausencia) {
    var tr = document.createElement('tr');

    var thId = document.createElement('th');
    thId.setAttribute('scope', 'row');
    thId.textContent = ausencia.id;

    // Nome do funcionário
    var tdNome = document.createElement('td');
    tdNome.textContent = ausencia.nome;

    // Data da ausência
    var tdData = document.createElement('td');
    tdData.textContent = ausencia.data;

    // Status bolinha
    var tdStatus = document.createElement('td');
    var statusBall = document.createElement('span');
    statusBall.classList.add('status-ball');
    statusBall.classList.add(ausencia.status.toLowerCase());
    tdStatus.appendChild(statusBall);

    // Texto Status
    var tdStatusText = document.createElement('span');
    tdStatusText.classList.add('status-text');
    tdStatusText.textContent = ausencia.status;
    tdStatus.appendChild(tdStatusText);

    // Hide/Show detalhes da justificativa
    var tdHideShow = document.createElement('td');
    var hideShowButton = document.createElement('button');
    hideShowButton.textContent = 'Detalhes';
    hideShowButton.classList.add('hide-show-button');
    hideShowButton.addEventListener('click', function() {
      // Exibir ou ocultar os detalhes da ausência
      var detailsDiv = tr.querySelector('.details');
      if (detailsDiv.style.display === 'none') {
        detailsDiv.style.display = 'block';
        hideShowButton.textContent = 'Ocultar';
      } else {
        detailsDiv.style.display = 'none';
        hideShowButton.textContent = 'Detalhes';
      }
    });
    tdHideShow.appendChild(hideShowButton);

    // Detalhes da ausência (inicialmente ocultos)
    var detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');
    detailsDiv.style.display = 'none';

    var detailsList = document.createElement('ul');

    // Motivo da Ausência
    var motivoItem = document.createElement('li');
    motivoItem.textContent = 'Motivo da Ausência: ' + ausencia.motivo;
    detailsList.appendChild(motivoItem);

    // Observação
    var observacaoItem = document.createElement('li');
    observacaoItem.textContent = 'Observação: ' + ausencia.observacao;
    detailsList.appendChild(observacaoItem);

    var anexo = document.createElement('li');
    anexo.textContent = 'Anexo: ' + ausencia.anexo;
    detailsList.appendChild(anexo);

// Criar o elemento <div> para os botões
var buttonList = document.createElement('div');

// Estilizar o <div> para exibir os botões lado a lado
buttonList.style.display = 'flex';

// Verificar se o status é "Pendente" para exibir os botões
if (ausencia.status.toLowerCase() === 'pendente') {
  // Criar o botão "Aprovar"
  var approveButton = document.createElement('button');
  approveButton.textContent = 'Aprovar';
  buttonList.appendChild(approveButton);

  // Criar o botão "Negar"
  var denyButton = document.createElement('button');
  denyButton.textContent = 'Negar';
  buttonList.appendChild(denyButton);
}


// Adicionar os botões ao elemento <div>


    detailsDiv.appendChild(detailsList);
    detailsDiv.appendChild(buttonList);
    tdHideShow.appendChild(detailsDiv);

    tr.appendChild(thId);
    tr.appendChild(tdNome);
    tr.appendChild(tdData);
    tr.appendChild(tdStatus);
    tr.appendChild(tdHideShow);

    tableBody.appendChild(tr);
  });
}

// Chamar a função para exibir as ausências ao carregar a página
exibirAusencias();
