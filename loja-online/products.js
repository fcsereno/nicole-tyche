// Categorias do catálogo, na ordem em que devem aparecer na página.
// Pra criar uma categoria nova, basta adicionar um item aqui (com um "id"
// livre) e usar esse mesmo id no campo "category" dos produtos abaixo —
// a seção e a grade aparecem sozinhas, sem precisar editar o HTML.
const CATEGORIES = [
  { id: "docinhos", label: "Les Petits", title: "Docinhos" },
  { id: "doces", label: "Les Gourmandises", title: "Doces" },
  { id: "bolos", label: "Les Gâteaux", title: "Bolos" },
];

// Catálogo de produtos. Para trocar uma foto, defina "image" com o caminho
// do arquivo (ex: "images/petit-citron.jpg"). Enquanto image for null,
// aparece um selo "foto em breve" no lugar.
const PRODUCTS = [
  {
    id: "petit-citron",
    category: "docinhos",
    num: "I",
    name: "Petit Citron",
    desc: "Uma base delicada, creme de limão que equilibra frescor e suavidade, encerrado por uma nuvem de merengue suíço tostado. Pequeno. Preciso. Irresistível.",
    price: 120.0,
    unit: "50 unidades",
    image: null,
  },
  {
    id: "blanc-tropical",
    category: "docinhos",
    num: "II",
    name: "Blanc Tropical",
    desc: "A cremosidade do leite ninho encontra a alma do coco. Um docinho que carrega calor, memória afetiva e um toque de brisa tropical em cada mordida.",
    price: 80.0,
    unit: "50 unidades",
    image: "images/blanc-tropical.jpg",
  },
  {
    id: "velours-noir",
    category: "doces",
    num: "III",
    name: "Brownie Velours Noir",
    desc: "Chocolate nobre em sua forma mais intensa. Denso, úmido, com aquela textura que some devagar. Para quem leva chocolate a sério.",
    price: 165.0,
    unit: "50 unidades",
    image: null,
  },
  {
    id: "verrine-fraise",
    category: "docinhos",
    num: "IV",
    name: "Petit Verrine Fraise",
    desc: "Cheesecake cremoso em camadas, com geleia de morango artesanal. Fresco, elegante e levemente ácido — como uma sobremesa parisiense servida em copinho. ",
    price: 175.0,
    unit: "50 unidades",
    image: null,
  },
  {
    id: "verrine-romeu-julieta",
    category: "docinhos",
    num: "V",
    name: "Petit Verrine Romeu e Julieta",
    desc: "A combinação mais clássica da confeitaria brasileira reinterpretada. Cream cheese sedoso, goiabada encorpada. Um romance em cada colherada.",
    price: 160.0,
    unit: "50 unidades",
    image: null,
  },
  {
    id: "miel-noir",
    category: "doces",
    num: "I",
    name: "Miel Noir",
    desc: "Massa escura e úmida de especiarias, abraçada por uma fina camada de chocolate nobre. Pequeno como um segredo, intenso como deve ser. Disponível em: Clássico · Doce de Leite · Brigadeiro · Maracujá · Limão Siciliano · Framboesa · Café · Nozes. ",
    price: 45.0,
    unit: "10 unidades",
    image: "images/miel-noir.jpg",
  },
  {
    id: "sur-mesure",
    category: "bolos",
    num: "I",
    name: "Sur Mesure",
    desc: "Cada bolo nasce de uma conversa. Sabores, recheios e decoração criados exclusivamente para o seu momento. Entre em contato e criamos juntos.",
    price: null,
    unit: "sob consulta",
    image: "images/sur-mesure.jpg",
  },
];
