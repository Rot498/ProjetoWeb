document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let nomeCategoria = params.get("nome");
  const titulo = document.getElementById("tituloCategoria");
  const container = document.getElementById("listaCategoria");
  const filtrosWrap = document.getElementById("filtrosCategoria");

  const API = "http://localhost:3000/api/produtos";
  let produtosCache = [];

  async function carregarProdutos() {
    try {
      const res = await fetch(API);
      const lista = await res.json();
      if (!Array.isArray(lista) || lista.length === 0) {
        if (titulo) titulo.textContent = "Nenhum produto cadastrado.";
        if (container) container.innerHTML = "";
        return;
      }
      produtosCache = lista;
      inicializar();
    } catch (err) {
      console.error(err);
      if (titulo) titulo.textContent = "Erro ao carregar produtos.";
    }
  }

  function inicializar(){
    if (!nomeCategoria) {
      nomeCategoria = "Todas";
    }

    const categoriasUnicas = [...new Set(produtosCache.map(p => p.categoria))];

    function renderChips(){
      if (!filtrosWrap) return;
      filtrosWrap.innerHTML = categoriasUnicas.map(cat => `
        <button class="category-chip${cat === nomeCategoria ? " category-chip--active" : ""}" data-cat="${cat}">${cat}</button>
      `).join("");
    }

    function filtrarProdutos(){
      let lista = produtosCache;
      if (nomeCategoria && nomeCategoria !== "Todas") {
        lista = produtosCache.filter(p => p.categoria === nomeCategoria);
      }
      return lista;
    }

    function renderProdutos(){
      const lista = filtrarProdutos();
      if (titulo){
        titulo.textContent = nomeCategoria && nomeCategoria !== "Todas"
          ? "Categoria: " + nomeCategoria
          : "Todas as categorias";
      }

      if (!container) return;

      if (lista.length === 0) {
        container.innerHTML = `<p>Nenhum produto encontrado nesta categoria.</p>`;
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

    renderChips();
    renderProdutos();

    if (filtrosWrap){
      filtrosWrap.addEventListener('click', function(ev){
        const btn = ev.target.closest('button[data-cat]');
        if (!btn) return;
        nomeCategoria = btn.getAttribute('data-cat');
        const url = new URL(window.location.href);
        url.searchParams.set('nome', nomeCategoria);
        window.history.replaceState({}, "", url.toString());
        renderChips();
        renderProdutos();
      });
    }

    if (container){
      container.addEventListener('click', function(ev){
        const verId = ev.target.getAttribute('data-ver');
        const addId = ev.target.getAttribute('data-add');
        if (verId){
          navegarParaDetalhes(verId);
        } else if (addId){
          adicionarAoCarrinho(addId);
        }
      });
    }
  }

  carregarProdutos();
});