const WHATSAPP_NUMBER = "5522999484026";
const STORAGE_KEY = "nicoletyche_cart";

const Cart = {
  items: {}, // id -> qty

  load() {
    try {
      this.items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      this.items = {};
    }
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  },

  add(id, qty) {
    this.items[id] = (this.items[id] || 0) + qty;
    this.save();
    this.render();
  },

  setQty(id, qty) {
    if (qty <= 0) {
      delete this.items[id];
    } else {
      this.items[id] = qty;
    }
    this.save();
    this.render();
  },

  remove(id) {
    delete this.items[id];
    this.save();
    this.render();
  },

  count() {
    return Object.values(this.items).reduce((a, b) => a + b, 0);
  },

  total() {
    return Object.entries(this.items).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find((p) => p.id === id);
      return sum + (p && p.price ? p.price * qty : 0);
    }, 0);
  },

  formatBRL(value) {
    return "R$ " + value.toFixed(2).replace(".", ",");
  },

  buildMessage() {
    const lines = ["Olá! Gostaria de fazer o seguinte pedido:", ""];
    Object.entries(this.items).forEach(([id, qty]) => {
      const p = PRODUCTS.find((p) => p.id === id);
      if (!p) return;
      const subtotal = this.formatBRL(p.price * qty);
      lines.push(`- ${qty}x ${p.name} (${p.unit}) — ${subtotal}`);
    });
    lines.push("", `Total: ${this.formatBRL(this.total())}`);
    return lines.join("\n");
  },

  checkoutUrl() {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(this.buildMessage())}`;
  },

  render() {
    const list = document.getElementById("cart-items");
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total-value");
    const checkoutBtn = document.getElementById("cart-checkout");

    const entries = Object.entries(this.items);
    countEl.textContent = this.count();
    totalEl.textContent = this.formatBRL(this.total());
    checkoutBtn.disabled = entries.length === 0;

    if (entries.length === 0) {
      list.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
      return;
    }

    list.innerHTML = entries
      .map(([id, qty]) => {
        const p = PRODUCTS.find((p) => p.id === id);
        if (!p) return "";
        return `
          <div class="cart-item" data-id="${id}">
            <div class="cart-item-info">
              <div class="cart-item-name">${p.name}</div>
              <div class="cart-item-unit">${qty}x · ${p.unit}</div>
              <div class="cart-item-row">
                <span class="cart-item-price">${this.formatBRL(p.price * qty)}</span>
                <button class="cart-item-remove" data-remove="${id}">remover</button>
              </div>
            </div>
          </div>`;
      })
      .join("");

    list.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => this.remove(btn.dataset.remove));
    });
  },

  init() {
    this.load();
    this.render();

    const toggle = document.getElementById("cart-toggle");
    const close = document.getElementById("cart-close");
    const backdrop = document.getElementById("cart-backdrop");
    const checkoutBtn = document.getElementById("cart-checkout");

    const open = () => document.body.classList.add("cart-open");
    const shut = () => document.body.classList.remove("cart-open");

    toggle.addEventListener("click", open);
    close.addEventListener("click", shut);
    backdrop.addEventListener("click", shut);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") shut();
    });

    checkoutBtn.addEventListener("click", () => {
      window.open(this.checkoutUrl(), "_blank");
    });
  },
};
