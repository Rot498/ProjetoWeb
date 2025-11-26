(function () {
  'use strict';

  const API = "http://localhost:3000/api/produtos";
  let catalogo = [];

  function lerCarrinho() {
    try {
      return JSON.parse(localStorage.getItem('carrinho') || '[]');
    } catch (e) {
      return [];
    }
  }

  function salvarCarrinho(itens) {
    localStorage.setItem('carrinho', JSON.stringify(itens));
  }

  function encontrarProduto(id) {
    return catalogo.find(p => String(p.id) === String(id)) || null;
  }

  function formatarPreco(valor) {
    return 'R$ ' + Number(valor).toFixed(2);
  }

  function atualizarResumo(tabelaBody, resumoEl) {
    const itens = lerCarrinho();
    if (!tabelaBody || !resumoEl) return;

    if (!Array.isArray(itens) || itens.length === 0) {
      tabelaBody.innerHTML = '<tr><td colspan="5">Seu carrinho está vazio.</td></tr>';
      resumoEl.innerHTML = '';
      if (typeof window.atualizarContadorCarrinho === 'function') {
        window.atualizarContadorCarrinho();
      }
      return;
    }

    let total = 0;
    tabelaBody.innerHTML = itens.map((item, index) => {
      const produto = encontrarProduto(item.id) || { id: item.id, nome: 'Produto', preco: 0 };
      const qtd = item.qtd != null ? item.qtd : 1;
      const subtotal = Number(produto.preco || 0) * qtd;
      total += subtotal;
      return `
        <tr data-idx="${index}">
          <td>${produto.id}</td>
          <td>${produto.nome}</td>
          <td>
            <input type="number" min="1" value="${qtd}" class="campo-qtd">
          </td>
          <td>${formatarPreco(subtotal)}</td>
          <td><button class="btn-remover">Remover</button></td>
        </tr>
      `;
    }).join('');

    resumoEl.innerHTML = '<p><strong>Total:</strong> ' + formatarPreco(total) + '</p>';

    tabelaBody.querySelectorAll('tr').forEach(tr => {
      const idx = parseInt(tr.getAttribute('data-idx'));
      const inputQtd = tr.querySelector('.campo-qtd');
      const btnRemover = tr.querySelector('.btn-remover');

      if (inputQtd) {
        inputQtd.addEventListener('change', () => {
          let itensCarrinho = lerCarrinho();
          const novoValor = parseInt(inputQtd.value) || 1;
          if (!itensCarrinho[idx]) return;
          itensCarrinho[idx].qtd = novoValor;
          salvarCarrinho(itensCarrinho);
          atualizarResumo(tabelaBody, resumoEl);
          if (typeof window.atualizarContadorCarrinho === 'function') {
            window.atualizarContadorCarrinho();
          }
        });
      }

      if (btnRemover) {
        btnRemover.addEventListener('click', () => {
          let itensCarrinho = lerCarrinho();
          itensCarrinho.splice(idx, 1);
          salvarCarrinho(itensCarrinho);
          atualizarResumo(tabelaBody, resumoEl);
          if (typeof window.atualizarContadorCarrinho === 'function') {
            window.atualizarContadorCarrinho();
          }
        });
      }
    });
  }

  async function carregarCatalogo() {
    try {
      const res = await fetch(API);
      const lista = await res.json();
      if (Array.isArray(lista)) {
        catalogo = lista;
      } else {
        catalogo = [];
      }
    } catch (e) {
      console.error(e);
      catalogo = [];
    }
  }

  document.addEventListener('DOMContentLoaded', async function () {
    const tabela = document.querySelector('#tabelaCarrinho tbody');
    const resumo = document.getElementById('resumoCompra');

    if (tabela && resumo) {
      await carregarCatalogo();
      atualizarResumo(tabela, resumo);
    }
  });
})();