// usuario.js — comportamento de login, cadastro, suporte e recuperação de senha
// Não usa localStorage, tudo simulado para fins de front-end
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ===== LOGIN ===== */
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
      formLogin.addEventListener('submit', function (ev) {
        ev.preventDefault();

        const tipo = (document.getElementById('tipoUsuario') || {}).value || 'cliente';
        const email = (document.getElementById('email') || {}).value.trim();
        const senha = (document.getElementById('senha') || {}).value;

        if (!email || !senha) {
          alert('Preencha e-mail e senha.');
          return;
        }

        if (tipo === 'admin') {
          if (email.toLowerCase() === 'admin@admin.com' && senha === 'admin') {
            window.location.href = 'admin/dashboard.html';
            return;
          } else {
            alert('Credenciais de administrador inválidas.');
            return;
          }
        }

        // Cliente comum (simulação)
        window.location.href = 'index.html';
      });
    }

    /* ===== CADASTRO ===== */
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
      formCadastro.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        // Redireciona após 2 segundos
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      });
    }

    /* ===== RECUPERAR SENHA ===== */
    const formRec = document.getElementById('formRecuperar');
    if (formRec) {
      formRec.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = (document.getElementById('emailRec') || {}).value.trim();
        if (!email) {
          alert('Informe o e-mail cadastrado para recuperação.');
          return;
        }

        // Mensagem de simulação
        alert('Instruções de recuperação enviadas para o e-mail informado.');

        // Redireciona automaticamente para login após 2 segundos
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 500);
      });
    }

    /* ===== SUPORTE ===== */
    const formSup = document.getElementById('formSuporte');
    if (formSup) {
      formSup.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Mensagem enviada! Em breve entraremos em contato.');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 500);
      });
    }

  });
})();
