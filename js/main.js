/**
 * main.js - Comportamentos front-end globais
 * - Toggle do menu móvel (burger)
 * - Banner de cookies (grava cookie simples)
 * - Pequenas melhorias de acessibilidade
 *
 * Coloque em: js/main.js
 */

(function () {
  'use strict';

  // --- Helpers (pequenas utilidades) ---
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  // Cookie util (expire em dias)
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
  }
  function getCookie(name) {
    const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return v ? decodeURIComponent(v.pop()) : null;
  }

  // DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {

    // --- Burger / menu móvel ---
    const burger = qs('#site-burger');
    const navList = qs('.nav-list');

    if (burger && navList) {
      burger.addEventListener('click', function () {
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!expanded));
        // toggle visual
        if (navList.style.display === 'flex' || getComputedStyle(navList).display === 'flex') {
          navList.style.display = 'none';
        } else {
          navList.style.display = 'flex';
          navList.style.flexDirection = 'column';
        }
      });

      // fecha menu ao clicar em link (mobile)
      qsa('.nav-list a').forEach(a => {
        a.addEventListener('click', () => {
          if (window.innerWidth <= 800) {
            burger.setAttribute('aria-expanded', 'false');
            navList.style.display = 'none';
          }
        });
      });
    }

    // --- Cookie banner simples (usa cookie, não localStorage) ---
    const cookieName = 'stopecas_cookies';
    const cookieBanner = qs('#cookie-banner');
    if (cookieBanner) {
      // se cookie já existir, não mostra
      if (getCookie(cookieName)) {
        cookieBanner.style.display = 'none';
      } else {
        cookieBanner.style.display = 'block';
      }

      const acceptBtn = cookieBanner.querySelector('#accept-cookies');
      const rejectBtn = cookieBanner.querySelector('#reject-cookies');

      if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
          setCookie(cookieName, 'accepted', 365);
          cookieBanner.style.display = 'none';
        });
      }
      if (rejectBtn) {
        rejectBtn.addEventListener('click', function () {
          setCookie(cookieName, 'rejected', 365);
          cookieBanner.style.display = 'none';
        });
      }
    }

    // --- Small accessibility: add focus states for keyboard users ---
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });

    // --- Progressive enhancement: replace placeholders for images without src ---
    qsa('img').forEach(img => {
      if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
        img.src = 'assets/img/produtos/placeholder.png';
      }
    });

    // --- Carrega produtos se função global existir (produtosFake.js) ---
    if (typeof renderizarProdutosDestaque === 'function') {
      try { renderizarProdutosDestaque(); } catch (err) { /* não bloqueia o site */ }
    }

  }); // DOMContentLoaded

})();
