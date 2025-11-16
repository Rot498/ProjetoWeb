document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("listaProdutos");
  if (!container) return;

  if (produtos.length === 0) {
    container.innerHTML = "<p>Nenhum produto disponível no momento.</p>";
    return;
  }

  // Gera o HTML dos produtos
  container.innerHTML = produtos.map(p => `
    <div class="product-card">
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
      <a href="produto.html?id=${p.id}" class="botao-finalizar">Ver Detalhes</a>
    </div>
  `).join("");

  // Aplica estilo visual às imagens
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
