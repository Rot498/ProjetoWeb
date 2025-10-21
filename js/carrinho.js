// carrinho.js — manipulação sem localStorage, usando query string (?cart=P-1001:2)
(function () {
  'use strict';

  function parseCarrinho() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('cart');
    if (!raw) return [];
    return raw.split(',').map(p => {
      const [id, qtd] = p.split(':');
      return { id, quantidade: parseInt(qtd || '1') };
    });
  }

  function gerarQueryCarrinho(itens) {
    return itens.map(i => `${i.id}:${i.quantidade}`).join(',');
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* ===== PRODUTO.HTML ===== */
    const detalhe = document.getElementById('produtoDetalhes');
    if (detalhe) {
      const id = new URLSearchParams(window.location.search).get('id');
      const p = buscarProduto(id);
      if (!p) {
        detalhe.innerHTML = '<p>Produto não encontrado.</p>';
        return;
      }
      detalhe.innerHTML = `
        <article class="product-card" style="max-width:600px;margin:auto;">
          <img src="${p.imagem}" alt="${p.nome}">
          <h2>${p.nome}</h2>
          <p><strong>Marca:</strong> ${p.marca}</p>
          <p><strong>Preço:</strong> R$ ${p.preco.toFixed(2)}</p>
          <p><strong>Compatibilidade:</strong> ${p.compatibilidade}</p>
          <p>${p.descricao}</p>
          <label for="qtd">Quantidade:</label>
          <input id="qtd" type="number" value="1" min="1">
          <button id="btnAddCarrinho">Adicionar ao Carrinho</button>
        </article>
      `;

      const btnAdd = document.getElementById('btnAddCarrinho');
      btnAdd.addEventListener('click', () => {
        const qtd = parseInt(document.getElementById('qtd').value);
        const itens = parseCarrinho();
        const existente = itens.find(i => i.id === id);
        if (existente) existente.quantidade += qtd;
        else itens.push({ id, quantidade: qtd });
        const novaQuery = gerarQueryCarrinho(itens);
        window.location.href = `carrinho.html?cart=${encodeURIComponent(novaQuery)}`;
      });
    }

    /* ===== CARRINHO.HTML ===== */
    const tabela = document.querySelector('#tabelaCarrinho tbody');
    const resumo = document.getElementById('resumoCompra');
    if (tabela && resumo) {
      const itens = parseCarrinho();
      if (itens.length === 0) {
        tabela.innerHTML = `<tr><td colspan="5">Seu carrinho está vazio.</td></tr>`;
        resumo.innerHTML = '';
        return;
      }

      let total = 0;
      tabela.innerHTML = itens.map(item => {
        const prod = buscarProduto(item.id);
        if (!prod) return '';
        const subtotal = prod.preco * item.quantidade;
        total += subtotal;
        return `
          <tr>
            <td>${prod.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${prod.preco.toFixed(2)}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button class="remover" data-id="${item.id}">Remover</button></td>
          </tr>
        `;
      }).join('');

      resumo.innerHTML = `
        <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
        <a class="botao-finalizar" href="finalizar-compra.html?cart=${encodeURIComponent(gerarQueryCarrinho(itens))}">
          Finalizar Compra
        </a>
      `;

      // Remover item
      tabela.querySelectorAll('.remover').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const novo = itens.filter(i => i.id !== id);
          const novaQuery = gerarQueryCarrinho(novo);
          if (novo.length === 0)
            window.location.href = 'carrinho.html';
          else
            window.location.href = `carrinho.html?cart=${encodeURIComponent(novaQuery)}`;
        });
      });
    }

    /* ===== CONFIRMAÇÃO DE PEDIDO ===== */
    const protocolo = document.getElementById('protocolo');
    if (protocolo) {
      protocolo.textContent = '#' + Math.floor(Math.random() * 90000 + 10000);
    }

  });

})();
