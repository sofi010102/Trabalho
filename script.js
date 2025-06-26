const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const itemList = document.getElementById('itemList');

// Carrega do localStorage
let items = JSON.parse(localStorage.getItem('listaCompras')) || [];

function salvarLista() {
  localStorage.setItem('listaCompras', JSON.stringify(items));
}

function renderLista() {
  itemList.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.comprado) li.classList.add('comprado');

    const span = document.createElement('span');
    span.textContent = item.nome;
    span.className = 'item-text';

    const actions = document.createElement('div');
    actions.className = 'actions';

    const compradoBtn = document.createElement('button');
    compradoBtn.textContent = ' ✔';
    compradoBtn.className = 'comprado-btn';
    compradoBtn.addEventListener('click', () => {
      items[index].comprado = !items[index].comprado;
      salvarLista();
      renderLista();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '🗑️';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => {
      items.splice(index, 1);
      salvarLista();
      renderLista();
    });

    actions.appendChild(compradoBtn);
    actions.appendChild(removeBtn);

    li.appendChild(span);
    li.appendChild(actions);

    itemList.appendChild(li);
  });
}

addButton.addEventListener('click', () => {
  const nome = itemInput.value.trim();
  if (nome) {
    items.push({ nome, comprado: false });
    itemInput.value = '';
    salvarLista();
    renderLista();
  }
});

itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addButton.click();
  }
});

// Inicializa
renderLista();
