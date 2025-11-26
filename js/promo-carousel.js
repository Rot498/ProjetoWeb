document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.promo-slide'));
  const dots = Array.from(document.querySelectorAll('.promo-dot'));
  if (!slides.length || !dots.length) return;

  let indiceAtual = 0;
  let timer = null;

  function mostrarSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    indiceAtual = index;
  }

  function proximoSlide() {
    const novo = (indiceAtual + 1) % slides.length;
    mostrarSlide(novo);
  }

  function iniciarAutoPlay() {
    pararAutoPlay();
    timer = setInterval(proximoSlide, 5000); // troca a cada 5s
  }

  function pararAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const alvo = Number(dot.getAttribute('data-slide')) || 0;
      mostrarSlide(alvo);
      iniciarAutoPlay();
    });
  });

  // inicia
  mostrarSlide(0);
  iniciarAutoPlay();

  // pausa quando o mouse está em cima do carrossel
  const carousel = document.querySelector('.promo-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', pararAutoPlay);
    carousel.addEventListener('mouseleave', iniciarAutoPlay);
  }
});
