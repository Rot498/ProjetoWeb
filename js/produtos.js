document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("listaProdutos");
  if (!container) return;

  const API = typeof window.API_PRODUTOS !== "undefined" ? window.API_PRODUTOS : `http://${window.location.hostname || "localhost"}:3000/api/produtos`;

  async function carregarTodos() {
    try {
      const res = await fetch(API);
      const lista = await res.json();
      if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = "<p>Nenhum produto disponível no momento.</p>";
        return;
      }

      container.innerHTML = lista.map(p => `
        <article class="product-card" data-id="${p.id}">
          <img src="${p.imagem}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <p class="product-description">${p.descricao || ""}</p>
          <p class="product-price">R$ ${Number(p.preco).toFixed(2)}</p>
          <div class="product-actions">
            <button class="btn-secundario" data-ver="${p.id}">Ver detalhes</button>
            <button data-add="${p.id}">Adicionar ao carrinho</button>
          </div>
        </article>
      `).join("");
    } catch (err) {
      console.error(err);
      container.innerHTML = "<p>Erro ao carregar produtos.</p>";
    }
  }

  function navegarParaDetalhes(id){
    window.location.href = "detalhes.html?id=" + encodeURIComponent(id);
  }

  function adicionarAoCarrinho(id){
    let carrinho;
    try{
      carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    }catch(e){
      carrinho = [];
    }
    const existente = carrinho.find(i => i.id === id);
    if (existente) existente.qtd = (existente.qtd || 1) + 1;
    else carrinho.push({ id, qtd: 1 });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    if (typeof window.atualizarContadorCarrinho === 'function') {
      window.atualizarContadorCarrinho();
    }
    alert('Produto adicionado ao carrinho.');
  }

  container.addEventListener('click', function(ev){
    const verId = ev.target.getAttribute('data-ver');
    const addId = ev.target.getAttribute('data-add');
    if (verId){
      navegarParaDetalhes(verId);
    } else if (addId){
      adicionarAoCarrinho(addId);
    }
  });

  carregarTodos();
});