# Nicole Tyche · Loja Online

Catálogo de produtos com carrinho de compras, feito em HTML/CSS/JS puro (sem
build, sem framework, sem backend). O pedido é fechado pelo WhatsApp: o
cliente monta o carrinho no site, e ao finalizar, o site já abre o WhatsApp
com a mensagem do pedido pronta (itens, quantidades e total).

Publicado em: https://fcsereno.github.io/nicole-tyche/

## Estrutura dos arquivos

```
loja-online/
├── index.html         → esqueleto da página (cabeçalho, carrinho, rodapé)
├── styles.css          → todo o visual (cores, fontes, layout, responsivo)
├── products.js         → categorias e produtos (o arquivo que você edita)
├── cart.js              → lógica do carrinho (adicionar, remover, total, WhatsApp)
├── app.js               → monta a página a partir de products.js
├── assets/
│   ├── logo.png          → logo usada no cabeçalho
│   └── favicon.ico       → ícone da aba do navegador
└── images/
    └── *.jpg              → fotos dos produtos
```

No dia a dia, **o único arquivo que você deve editar é o `products.js`**.
Os outros (`index.html`, `app.js`, `cart.js`, `styles.css`) são a
"engrenagem" da página e não precisam ser tocados para o uso normal
(adicionar produto, trocar preço, adicionar categoria).

## Como editar os produtos

Cada produto em `products.js` é um bloco assim:

```js
{
  id: "petit-citron",              // identificador único, sem espaço/acento
  category: "docinhos",            // precisa bater com um id em CATEGORIES
  num: "I",                        // numeração dentro da categoria (decorativo)
  name: "Petit Citron",            // nome exibido
  desc: "Uma base delicada...",    // descrição exibida
  price: 120.0,                    // preço em número (use null para "sob consulta")
  unit: "50 unidades",             // texto ao lado do preço
  image: "images/petit-citron.jpg" // caminho da foto, ou null para "foto em breve"
},
```

- Pra **adicionar um produto**: copie um bloco inteiro, cole antes do `];`
  final, e ajuste os campos. Aparece automaticamente na categoria certa,
  sem precisar mexer em mais nada.
- Pra **remover um produto**: apague o bloco inteiro (da `{` até a `},`).
- Pra **produto sob consulta** (sem preço fixo, tipo bolo personalizado):
  deixe `price: null` — a página troca o botão "Adicionar" por
  "Solicitar orçamento", que abre o WhatsApp perguntando sobre aquele item.

## Como funcionam as categorias

No topo do `products.js` fica a lista `CATEGORIES`, que define **quais
seções existem e em que ordem aparecem na página**:

```js
const CATEGORIES = [
  { id: "docinhos", label: "Les Petits", title: "Docinhos" },
  { id: "doces", label: "Les Gourmandises", title: "Doces" },
  { id: "bolos", label: "Les Gâteaux", title: "Bolos" },
];
```

- `id` — precisa ser exatamente igual ao `category` usado nos produtos.
- `label` / `title` — o texto decorativo exibido (ex: "Les Petits · Docinhos").

Pra **criar uma categoria nova** (ex: "Tortas"), adicione uma linha aqui:

```js
{ id: "tortas", label: "Les Tartes", title: "Tortas" },
```

e use `category: "tortas"` nos produtos dela. A seção e a grade de produtos
aparecem sozinhas na página, na ordem em que estiverem em `CATEGORIES` — o
`index.html` nunca precisa ser editado para isso.

> Se um produto usar uma categoria que você esqueceu de cadastrar em
> `CATEGORIES`, ele ainda aparece no fim da página (com um título simples),
> em vez de sumir silenciosamente.

## Fotos dos produtos

- Tamanho recomendado: **800×600px** (proporção 4:3), formato **JPG**,
  mirando até ~200–300KB por imagem (carregamento rápido no celular).
- Nome do arquivo: use o mesmo `id` do produto (ex: `petit-citron.jpg`),
  guardado em `images/`.
- Enquanto não há foto, `image: null` mostra um selo "foto em breve" no
  lugar — a página nunca fica com imagem quebrada.

## O carrinho

- Cada produto com preço tem um seletor de quantidade + botão "Adicionar".
- O carrinho abre pelo botão flutuante (canto inferior direito) e fica
  salvo no navegador do cliente (localStorage) — se ele fechar a aba e
  voltar depois, os itens continuam lá.
- "Finalizar pedido no WhatsApp" monta automaticamente uma mensagem com a
  lista de itens, quantidades e o total, e abre o WhatsApp já preenchido
  (número configurado em `cart.js`, constante `WHATSAPP_NUMBER`).
- Não há pagamento online nem backend — a confirmação e o pagamento do
  pedido continuam acontecendo por fora, direto com você pelo WhatsApp.

## Publicar as alterações

O site é publicado via GitHub Pages a partir do repositório
`fcsereno/nicole-tyche`. Depois de editar `products.js` (ou qualquer outro
arquivo), as mudanças só aparecem no site publicado depois de um
`git commit` + `git push` para o branch `main`.
