document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("listaProdutos");
  if (!container) return;

  // Exibir apenas alguns produtos (exemplo: 4 em destaque)
  const produtosDestaque = produtos.slice(0, 4);

  container.innerHTML = produtosDestaque.map(p => `
    <div class="product-card">
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
      <a href="produto.html?id=${p.id}" class="botao-finalizar">Ver Detalhes</a>
    </div>
  `).join('');

  // Ajuste visual das imagens
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
