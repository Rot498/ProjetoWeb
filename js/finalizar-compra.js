// finalizar-compra.js — trata o envio e redireciona para a confirmação
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formFinalizar');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Pedido confirmado! Redirecionando...');
      const params = new URLSearchParams(window.location.search);
      const cart = params.get('cart') || '';
      window.location.href = `confirmacao-pedido.html?cart=${encodeURIComponent(cart)}`;
    });
  });
})();
