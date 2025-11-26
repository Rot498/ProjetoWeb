// Configuração global de API
// BASE_URL usa o hostname atual (PC ou IP da máquina no Wi-Fi)
(function(){
  const host = window.location.hostname || 'localhost';
  // porta fixa da API
  const port = 3000;
  const base = `http://${host}:${port}`;
  window.BASE_URL = base;
  window.API_PRODUTOS = `${base}/api/produtos`;
})();
