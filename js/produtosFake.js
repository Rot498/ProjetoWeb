// Catálogo fixo para demonstração
const produtos = [
  {
    id: "P-1001",
    nome: "Pastilha de Freio A",
    preco: 129.90,
    marca: "Bosch",
    compatibilidade: "Onix 2017-2022 / Prisma 2018-2020",
    descricao: "Pastilha dianteira de alta durabilidade e excelente frenagem.",
    imagem: "img/pastilha1.jpg"
  },
  {
    id: "P-1002",
    nome: "Filtro de Óleo X",
    preco: 49.90,
    marca: "Fram",
    compatibilidade: "HB20 2016-2021 / Creta 2018-2020",
    descricao: "Filtro premium para melhor desempenho do motor.",
    imagem: "img/produtos/filtro.jpg"
  },
  {
    id: "P-1003",
    nome: "Vela de Ignição Y",
    preco: 29.90,
    marca: "NGK",
    compatibilidade: "Gol 2015-2019",
    descricao: "Vela de ignição com alta durabilidade e melhor combustão.",
    imagem: "img/produtos/vela.jpg"
  }
];

// Busca produto pelo id
function buscarProduto(id) {
  return produtos.find(p => p.id === id);
}
