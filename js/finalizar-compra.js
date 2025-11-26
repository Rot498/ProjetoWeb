(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formFinalizar');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Pedido confirmado! Redirecionando...');
      // Limpa carrinho após finalizar
      localStorage.removeItem('carrinho');
      if (typeof window.atualizarContadorCarrinho === 'function') {
        window.atualizarContadorCarrinho();
      }
      window.location.href = 'confirmacao-pedido.html';
    });
  });
})();