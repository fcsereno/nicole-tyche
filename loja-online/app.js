function productMedia(p) {
  if (p.image) {
    return `<div class="product-media"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>`;
  }
  const initial = p.name.trim().charAt(0);
  return `
    <div class="product-media">
      <div class="product-placeholder">
        <span class="letter">${initial}</span>
        <span class="caption">foto em breve</span>
      </div>
    </div>`;
}

function productCard(p) {
  const meta = p.price
    ? `
      <span class="product-price">${Cart.formatBRL(p.price)}</span>
      <span class="product-sep"></span>
      <span>${p.unit}</span>`
    : `<span>${p.unit}</span>`;

  const actions = p.price
    ? `
      <div class="qty-stepper" data-stepper>
        <button type="button" data-step="-1">−</button>
        <span class="qty-value" data-qty>1</span>
        <button type="button" data-step="1">+</button>
      </div>
      <button type="button" class="add-btn" data-add="${p.id}">Adicionar</button>`
    : `<button type="button" class="quote-btn" data-quote="${p.id}">Solicitar orçamento</button>`;

  return `
    <article class="product" data-product="${p.id}">
      ${productMedia(p)}
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-meta">${meta}</div>
        <div class="product-actions">${actions}</div>
      </div>
    </article>`;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function sectionHTML(sectionIndex, heading, gridId) {
  return `
    <section class="part${sectionIndex > 0 ? " divider" : ""}">
      <div class="part-label">Parte ${ROMAN[sectionIndex] || sectionIndex + 1}</div>
      <h2 class="part-title">${heading}</h2>
    </section>
    <div class="grid" id="${gridId}"></div>`;
}

// Monta as seções e grades a partir de CATEGORIES + PRODUCTS. Categorias
// que ainda não tenham entrado em CATEGORIES (products.js) aparecem do
// mesmo jeito, no fim, com um título simples — nada fica escondido.
function renderGrids() {
  const catalog = document.getElementById("catalog");
  const pending = [];
  let sectionIndex = 0;
  let html = "";

  const addSection = (id, heading) => {
    const items = PRODUCTS.filter((p) => p.category === id);
    if (items.length === 0) return;
    const gridId = `grid-${id}`;
    html += sectionHTML(sectionIndex, heading, gridId);
    pending.push({ gridId, items });
    sectionIndex++;
  };

  CATEGORIES.forEach((cat) => addSection(cat.id, `${cat.label} · ${cat.title}`));

  const knownIds = CATEGORIES.map((cat) => cat.id);
  const usedIds = [...new Set(PRODUCTS.map((p) => p.category))];
  usedIds
    .filter((id) => !knownIds.includes(id))
    .forEach((id) => addSection(id, id.charAt(0).toUpperCase() + id.slice(1)));

  catalog.innerHTML = html;
  pending.forEach(({ gridId, items }) => {
    document.getElementById(gridId).innerHTML = items.map(productCard).join("");
  });
}

function wireProductActions() {
  document.querySelectorAll("[data-stepper]").forEach((stepper) => {
    const qtyEl = stepper.querySelector("[data-qty]");
    stepper.querySelectorAll("[data-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = parseInt(qtyEl.textContent, 10) + parseInt(btn.dataset.step, 10);
        qtyEl.textContent = Math.max(1, next);
      });
    });
  });

  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product");
      const qty = parseInt(card.querySelector("[data-qty]").textContent, 10);
      Cart.add(btn.dataset.add, qty);

      const original = btn.textContent;
      btn.textContent = "Adicionado ✓";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("added");
      }, 1200);
    });
  });

  document.querySelectorAll("[data-quote]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = PRODUCTS.find((p) => p.id === btn.dataset.quote);
      const msg = `Olá! Gostaria de saber mais sobre o ${p.name}.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    });
  });
}

renderGrids();
wireProductActions();
Cart.init();
