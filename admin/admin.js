// Admin em memória (apenas durante sessão)
let produtosAdmin = [
  { codigo: "P-1001", nome: "Pastilha de Freio A", preco: 129.90, marca: "Bosch" },
  { codigo: "P-1002", nome: "Filtro de Óleo X", preco: 49.90, marca: "Fram" }
];

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('formLoginAdmin');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('emailAdmin').value;
      const senha = document.getElementById('senhaAdmin').value;
      if (email === 'admin@stopecas.com' && senha === 'admin') {
        window.location.href = 'dashboard.html';
      } else alert('Acesso negado.');
    });
  }

  // popula tabela de produtos admin
  const tabela = document.querySelector('#tabelaProdutos tbody');
  if (tabela) atualizarTabelaAdmin();

  // formulário de adicionar produto
  const formProduto = document.getElementById('formProduto');
  if (formProduto) {
    formProduto.addEventListener('submit', (e) => {
      e.preventDefault();
      const novo = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nomeProd').value || document.getElementById('nome').value,
        marca: document.getElementById('marcaProd').value || document.getElementById('marca').value,
        preco: parseFloat(document.getElementById('precoProd').value || document.getElementById('preco').value)
      };
      produtosAdmin.push(novo);
      alert('Produto salvo (simulado).');
      window.location.href = 'produtos.html';
    });
  }
});

function atualizarTabelaAdmin() {
  const corpo = document.querySelector('#tabelaProdutos tbody');
  corpo.innerHTML = produtosAdmin.map(p => `
    <tr>
      <td>${p.codigo}</td>
      <td>${p.nome}</td>
      <td>${p.marca}</td>
      <td>R$ ${p.preco.toFixed(2)}</td>
      <td>
        <button onclick="editar('${p.codigo}')">Editar</button>
        <button onclick="excluir('${p.codigo}')">Excluir</button>
      </td>
    </tr>
  `).join('');
}

function editar(codigo) {
  alert('Edição simulada: ' + codigo + '. Use a tela de editar para alterar (simulação).');
  window.location.href = 'produto-editar.html';
}

function excluir(codigo) {
  produtosAdmin = produtosAdmin.filter(p => p.codigo !== codigo);
  atualizarTabelaAdmin();
}
