(function(){
  'use strict';

  function lerCarrinho(){
    try{
      return JSON.parse(localStorage.getItem('carrinho') || '[]');
    }catch(e){
      return [];
    }
  }

  function contarItens(){
    const itens = lerCarrinho();
    return itens.reduce((total, item) => {
      const q = item.qtd != null ? item.qtd : (item.quantidade != null ? item.quantidade : 1);
      return total + (isNaN(q) ? 0 : q);
    }, 0);
  }

  function atualizarContadorCarrinho(){
    const span = document.getElementById('contadorCarrinho');
    if(!span) return;
    const total = contarItens();
    span.textContent = total;
    span.style.display = total > 0 ? 'inline-flex' : 'none';
  }

  window.atualizarContadorCarrinho = atualizarContadorCarrinho;

  document.addEventListener('DOMContentLoaded', atualizarContadorCarrinho);
})();