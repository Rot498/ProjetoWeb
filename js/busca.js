document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formBusca');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('campoBusca').value.trim().toLowerCase();
    if (!q) return;
    // procura por id ou nome
    const found = produtos.filter(p => p.id.toLowerCase().includes(q) || p.nome.toLowerCase().includes(q));
    if (found.length === 0) {
      alert('Nenhum resultado encontrado.');
      return;
    }
    window.location.href = `produto.html?id=${found[0].id}`;
  });
});
