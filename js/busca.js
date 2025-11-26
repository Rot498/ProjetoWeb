document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formBusca');
  if (!form) return;

  const API = "http://localhost:3000/api/produtos";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const campo = document.getElementById('campoBusca');
    if (!campo) return;
    const q = campo.value.trim();
    if (!q) return;

    try {
      const params = new URLSearchParams({ q });
      const res = await fetch(API + '?' + params.toString());
      const lista = await res.json();
      if (!Array.isArray(lista) || lista.length === 0) {
        alert('Nenhum resultado encontrado.');
        return;
      }
      const primeiro = lista[0];
      window.location.href = `detalhes.html?id=${encodeURIComponent(primeiro.id)}`;
    } catch (err) {
      console.error(err);
      alert('Erro ao buscar produtos.');
    }
  });
});