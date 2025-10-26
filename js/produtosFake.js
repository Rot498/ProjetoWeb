// Catálogo fixo para demonstração
const produtos = [
  {
    id: "P-1001",
    nome: "Pastilha de Freio Dianteira",
    preco: 129.90,
    marca: "Bosch",
    compatibilidade: "Onix 2017-2022 / Prisma 2018-2020",
    descricao: "Pastilha dianteira de alta durabilidade e excelente frenagem.",
    categoria: "Freios",
    imagem: "img/pastilha1.jpg"
  },
  {
    id: "P-1002",
    nome: "Filtro de Óleo",
    preco: 40.00,
    marca: "Fram",
    compatibilidade: "HB20 2016-2021 / Creta 2018-2020",
    descricao: "Filtro premium para melhor desempenho do motor.",
    categoria: "Motor",
    imagem: "img/filtrooleo.jpeg"
  },
  {
    id: "P-1003",
    nome: "Vela de Ignição",
    preco: 29.90,
    marca: "NGK",
    compatibilidade: "Gol 2015-2019",
    descricao: "Vela de ignição com alta durabilidade e melhor combustão.",
    categoria: "Elétrica",
    imagem: "img/vela.jpg"
  },
  {
    id: "P-1004",
    nome: "Amortecedor Traseiro",
    preco: 289.90,
    marca: "Cofap",
    compatibilidade: "Civic 2006-2011",
    descricao: "Amortecedor de alto desempenho para conforto e segurança.",
    categoria: "Suspensão",
    imagem: "img/amortecedor.jpg"
  }
];

// Busca produto pelo id
function buscarProduto(id) {
  return produtos.find(p => p.id === id);
}
