document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nomeCategoria = params.get("nome");
  const titulo = document.getElementById("tituloCategoria");
  const container = document.getElementById("listaCategoria");

  if (!nomeCategoria) {
    titulo.textContent = "Categoria não encontrada";
    return;
  }

  titulo.textContent = `Categoria: ${nomeCategoria}`;

  const filtrados = produtos.filter(p => p.categoria === nomeCategoria);

  if (filtrados.length === 0) {
    container.innerHTML = `<p>Nenhum produto encontrado nesta categoria.</p>`;
    return;
  }

  container.innerHTML = filtrados.map(p => `
    <div class="product-card">
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
      <a href="produto.html?id=${p.id}" class="botao-finalizar">Ver Detalhes</a>
    </div>
  `).join('');

  // Aplica o estilo visual às imagens
  container.querySelectorAll("img").forEach(img => {
    img.style.width = "100%";
    img.style.maxWidth = "500px";
    img.style.height = "auto";
    img.style.display = "block";
    img.style.margin = "0 auto";
    img.style.borderRadius = "8px";
    img.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
  });
});
