document.addEventListener('DOMContentLoaded', function(){
  const botoes = document.querySelectorAll('.category-list button[data-cat]');
  botoes.forEach(btn => {
    btn.addEventListener('click', function(){
      const cat = this.getAttribute('data-cat');
      if(!cat) return;
      window.location.href = 'categoria.html?nome=' + encodeURIComponent(cat);
    });
  });
});