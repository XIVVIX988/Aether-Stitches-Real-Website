/*
 * Aether Stitches storefront interactions.
 * This file powers the static demo: product rendering, cart, forms, and admin mockups.
 * Production orders, customer data, and staff access need a secure server-side service.
 */

// Demo catalogue shared by the shop, category, product, and cart pages.
const products = [
  {
    id: "tote",
    name: "Leather Tote Bag",
    category: "Leather Goods",
    price: 12500,
    image: "Assets/reference/studio_tote_bag_1785921253592.jpg",
    tag: "Best seller",
  },
  {
    id: "backpack",
    name: "Classic Backpack",
    category: "Leather Goods",
    price: 18500,
    image: "Assets/reference/studio_backpack_bag_1785921210073.jpg",
  },
  {
    id: "wallet",
    name: "Everyday Wallet",
    category: "Leather Goods",
    price: 6500,
    image: "Assets/leather-wallet.svg",
  },
  {
    id: "belt",
    name: "Hand-finished Belt",
    category: "Accessories",
    price: 4500,
    image: "Assets/leather-belt.svg",
  },
  {
    id: "jacket",
    name: "Leather Field Jacket",
    category: "Apparel",
    price: 9800,
    image: "Assets/reference/studio_workwear_jacket_1785921270813.jpg",
    tag: "New",
  },
  {
    id: "crossbody",
    name: "Crossbody Satchel",
    category: "Leather Goods",
    price: 10000,
    image: "Assets/reference/studio_messenger_bag_1785921225724.jpg",
  },
  {
    id: "duffel",
    name: "Weekend Duffel",
    category: "Leather Goods",
    price: 22000,
    image: "Assets/reference/studio_duffel_bag_1785921241197.jpg",
  },
  {
    id: "cardholder",
    name: "Leather Cardholder",
    category: "Accessories",
    price: 3200,
    image: "Assets/leather-cardholder.svg",
  },
];

// Small helpers keep product cards and prices consistent across pages.
const imageUrl = (photoId, width = 800) => {
  if (photoId.startsWith("Assets/")) return photoId;
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=82`;
};

const formatPrice = (amount) =>
  `KSh ${Number(amount).toLocaleString("en-KE")}`;

function readCart() {
  return JSON.parse(localStorage.getItem("aether-cart") || "[]");
}

function writeCart(items) {
  localStorage.setItem("aether-cart", JSON.stringify(items));
  updateCartCount();
}

function updateCartCount() {
  const itemCount = readCart().reduce((count, item) => count + item.qty, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = itemCount;
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);

  window.setTimeout(() => toast.remove(), 2600);
}

function addToCart(productId, quantity = 1) {
  const cart = readCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.qty += quantity;
  } else {
    cart.push({ id: productId, qty: quantity });
  }

  writeCart(cart);
  showToast("Added to your bag");
}

function productCard(product) {
  return `
    <article class="product-card" data-category="${product.category}">
      <a class="product-image" href="product.html?id=${product.id}">
        <img loading="lazy" src="${imageUrl(product.image)}" alt="${product.name}">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
      </a>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-price">${formatPrice(product.price)}</div>
        <div class="swatches" aria-label="Available colours">
          <i class="swatch" style="background:#743e27"></i>
          <i class="swatch" style="background:#2f302e"></i>
          <i class="swatch" style="background:#b58b58"></i>
        </div>
      </div>
    </article>`;
}

function renderProducts(selector, productList = products) {
  document.querySelectorAll(selector).forEach((element) => {
    element.innerHTML = productList.map(productCard).join("");
  });
}

// Shared header and footer keep all customer pages visually consistent.
const siteHeader = `
  <div class="announcement">
    <div class="container announcement-inner">
      <span>Complimentary delivery within Kenya</span>
      <span>Thoughtfully made in Siaya, Kenya</span>
    </div>
  </div>
  <div class="microbar">
    <div class="container microbar-inner">
      <span><i></i> Made in Siaya · Serving Kenya &amp; East Africa</span>
    </div>
  </div>
  <header class="header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="index.html">
        <span class="brand-name">AETHER STITCHES<small>CRAFTED IN KENYA</small></span>
      </a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="shop.html">Shop</a>
        <a href="collections.html">Collections</a>
        <a href="bespoke.html">Bespoke</a>
        <a href="our-craft.html">Our Craft</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="nav-actions">
        <a class="icon-btn search-link" href="shop.html" aria-label="Search products">
          <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8"></circle>
            <path d="m16 16 5 5"></path>
          </svg>
        </a>
        <a class="icon-btn profile-link" href="account.html" aria-label="Your account">
          <svg class="profile-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5"></circle>
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>
          </svg>
        </a>
        <a class="icon-btn bag-link" href="cart.html" aria-label="Shopping bag">
          <svg class="bag-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 8.5h13l1 13h-15l1-13Z"></path>
            <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5"></path>
          </svg>
          <sup class="cart-count">0</sup>
        </a>
        <button class="icon-btn mobile-menu" aria-label="Open menu">☰</button>
      </div>
    </nav>
  </header>
  <a class="whatsapp-float" href="https://wa.me/254702077157?text=Hello%20Aether%20Stitches%2C%20I%27d%20like%20to%20make%20an%20inquiry."
     target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6a12 12 0 0 0 5.7 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.8 9.8 0 1 1 8.4 4.6Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2-.2-.5-.5-.5-.7-.5H8c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.5-.4Z"/>
    </svg>
    <span>WhatsApp us</span>
  </a>`;

// Social links use inline SVGs so the recognizable platform marks do not
// depend on an icon font or a third-party asset host.
const socialLinks = `
  <nav class="social-links" aria-label="Aether Stitches social profiles">
    <a href="https://x.com/aetherstitches" target="_blank" rel="noopener noreferrer" aria-label="Aether Stitches on X" title="X">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 1.2h3.7l-8.1 9.2L24 22.9h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.6h2L6.5 3.2H4.4l13.2 17.6Z"/></svg>
    </a>
    <a href="https://www.tiktok.com/@aether_stitches?_r=1&amp;_t=ZS-9Az1F5b2YuG" target="_blank" rel="noopener noreferrer" aria-label="Aether Stitches on TikTok" title="TikTok">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 6.2a6.7 6.7 0 0 1-4.1-4.1A7.1 7.1 0 0 1 15.2 1h-4.1v14.2a3 3 0 1 1-2.1-2.9v-4.2a7.2 7.2 0 1 0 6.2 7.1V8a10.7 10.7 0 0 0 6.2 2V5.9a6.7 6.7 0 0 1-1.8.3Z"/></svg>
    </a>
    <a href="https://www.instagram.com/aether_stitches?vrfl=MTl6bnZpbWU0NXNpaQ==" target="_blank" rel="noopener noreferrer" aria-label="Aether Stitches on Instagram" title="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 2.4a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm0 2.2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.7-3.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>
    </a>
    <a href="https://www.facebook.com/share/1HLrRpyZ4Z/" target="_blank" rel="noopener noreferrer" aria-label="Aether Stitches on Facebook" title="Facebook">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z"/></svg>
    </a>
    <a href="https://whatsapp.com/channel/0029Vb6wCp7Fy727v9p3IM3d" target="_blank" rel="noopener noreferrer" aria-label="Aether Stitches on WhatsApp" title="WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6a12 12 0 0 0 5.7 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.8 9.8 0 1 1 8.4 4.6Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2-.2-.5-.5-.5-.7-.5H8c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.5-.4Z"/></svg>
    </a>
  </nav>`;

const siteFooter = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html">
            <span class="brand-name">AETHER STITCHES<small>CRAFTED IN KENYA</small></span>
          </a>
          <p class="footer-intro">
            Considered leather goods and apparel, designed and made in Siaya, Kenya.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="shop.html">Shop all</a>
          <a href="collections.html">Collections</a>
          <a href="bespoke.html">Bespoke orders</a>
          <a href="our-craft.html">Our craft</a>
        </div>
        <div>
          <h4>Customer care</h4>
          <a href="contact.html">Contact us</a>
          <a href="shipping.html">Shipping</a>
          <a href="returns.html">Returns &amp; refunds</a>
          <a href="custom-orders.html">Custom order policy</a>
        </div>
        <div>
          <h4>Visit &amp; connect</h4>
          <p>Siaya Town, Kenya<br>+254 702 077 157<br>aetherstitches@gmail.com</p>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms &amp; conditions</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Aether Stitches. Made with care in Kenya.</span>
        ${socialLinks}
      </div>
    </div>
  </footer>`;

// Build the product detail panel from the product ID in the page URL.
function renderProductDetail() {
  const detail = document.querySelector("[data-product-detail]");
  if (!detail) return;

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = products.find((item) => item.id === productId) || products[0];

  detail.innerHTML = `
    <div class="gallery">
      <div class="thumbs">
        <img src="${imageUrl(product.image, 250)}" alt="${product.name}">
        <img src="${imageUrl("Assets/reference/tote_model_1785920174008.jpg", 250)}" alt="Product in use">
        <img src="${imageUrl("Assets/reference/aether_artisan_craft_1785587077227.jpg", 250)}" alt="Craft detail">
      </div>
      <div class="main-product-image">
        <img src="${imageUrl(product.image, 1200)}" alt="${product.name}">
      </div>
    </div>
    <div class="detail-copy">
      <div class="eyebrow">${product.category}</div>
      <h1>${product.name}</h1>
      <div class="rating">★★★★★ <span class="muted">(12 reviews)</span></div>
      <div class="detail-price">${formatPrice(product.price)}</div>
      <p class="product-description">
        A thoughtful everyday piece, cut from carefully selected leather and
        finished by hand in our Siaya workshop. Each piece carries its own
        natural character.
      </p>
      <div class="option-label">Colour · Chestnut</div>
      <div class="option-row">
        <button class="option-chip selected">Chestnut</button>
        <button class="option-chip">Black</button>
        <button class="option-chip">Tan</button>
      </div>
      <div class="option-label">Size</div>
      <div class="option-row"><button class="option-chip selected">One size</button></div>
      <div class="purchase-row">
        <input id="quantity" type="number" min="1" value="1" aria-label="Quantity">
        <button class="button" data-add="${product.id}">
          Add to bag · ${formatPrice(product.price)}
        </button>
      </div>
      <p class="small stock-note">✓ In stock · Complimentary delivery within Kenya</p>
      <div class="details-tabs">
        <b>Details &amp; care</b>
        <p>
          Made in small batches using durable materials. Natural variations in
          grain and tone are part of every piece. Wipe gently with a soft, dry cloth.
        </p>
      </div>
    </div>`;

  detail.querySelector("[data-add]").addEventListener("click", () => {
    const quantity = Number(detail.querySelector("#quantity").value || 1);
    addToCart(product.id, quantity);
  });
}

// Render cart rows, totals, removal controls, and quantity updates.
function renderCart() {
  const cartElement = document.querySelector("[data-cart]");
  if (!cartElement) return;

  const cart = readCart();
  if (cart.length === 0) {
    cartElement.innerHTML = `
      <div class="empty">
        <h2>Your bag is waiting</h2>
        <p class="muted">Discover something made to stay with you.</p>
        <a class="button" href="shop.html">Explore the shop</a>
      </div>`;
    return;
  }

  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product?.price || 0) * item.qty;
  }, 0);

  cartElement.innerHTML = `
    <div class="cart-layout">
      <div>
        ${cart.map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          if (!product) return "";

          return `
            <div class="cart-row">
              <img src="${imageUrl(product.image, 250)}" alt="${product.name}">
              <div>
                <h3>${product.name}</h3>
                <span class="small muted">${formatPrice(product.price)}</span>
                <p>
                  <button class="button-outline remove-item" data-id="${product.id}">
                    Remove
                  </button>
                </p>
              </div>
              <input class="cart-qty" data-id="${product.id}" type="number" min="1"
                value="${item.qty}" aria-label="Quantity for ${product.name}">
            </div>`;
        }).join("")}
      </div>
      <aside class="summary">
        <h3>Order summary</h3>
        <div class="summary-line"><span>Subtotal</span><b>${formatPrice(total)}</b></div>
        <div class="summary-line"><span>Delivery</span><span>Complimentary</span></div>
        <div class="summary-line summary-total"><b>Total</b><b>${formatPrice(total)}</b></div>
        <a class="button" href="checkout.html">Continue to checkout</a>
        <a class="button button-outline" href="shop.html">Continue shopping</a>
      </aside>
    </div>`;

  cartElement.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const updatedCart = readCart().filter((item) => item.id !== button.dataset.id);
      writeCart(updatedCart);
      renderCart();
    });
  });

  cartElement.querySelectorAll(".cart-qty").forEach((input) => {
    input.addEventListener("change", () => {
      const updatedCart = readCart();
      const item = updatedCart.find((entry) => entry.id === input.dataset.id);

      if (item) item.qty = Math.max(1, Number(input.value));
      writeCart(updatedCart);
      renderCart();
    });
  });
}

// Shop page filters can be combined with category and price sorting.
function initializeShop() {
  const shop = document.querySelector("[data-shop]");
  if (!shop) return;

  const grid = shop.querySelector(".product-grid");
  const searchInput = shop.querySelector("[data-search]");
  const initialSearch = new URLSearchParams(window.location.search).get("q") || "";
  if (initialSearch && searchInput) searchInput.value = initialSearch;

  const applyFilters = () => {
    const checkedCategories = [...shop.querySelectorAll("[data-filter]:checked")]
      .map((input) => input.value);
    const query = searchInput?.value.toLowerCase() || "";
    const sort = shop.querySelector("[data-sort]")?.value || "featured";

    let visibleProducts = products.filter((product) => {
      const categoryMatches = checkedCategories.length === 0
        || checkedCategories.includes(product.category);
      const searchMatches = !query
        || product.name.toLowerCase().includes(query)
        || product.category.toLowerCase().includes(query);

      return categoryMatches && searchMatches;
    });

    if (sort === "price-low") {
      visibleProducts = visibleProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      visibleProducts = visibleProducts.sort((a, b) => b.price - a.price);
    }

    grid.innerHTML = visibleProducts.map(productCard).join("");
    shop.querySelector("[data-result-count]").textContent =
      `Showing ${visibleProducts.length} products`;
  };

  shop.querySelectorAll("[data-filter], [data-sort]").forEach((control) => {
    control.addEventListener("change", applyFilters);
  });
  searchInput?.addEventListener("input", applyFilters);
  applyFilters();
}

// Category landing page uses the category name in its query string.
function initializeCategory() {
  const grid = document.querySelector("[data-category-grid]");
  if (!grid) return;

  const category = new URLSearchParams(window.location.search).get("category")
    || "Leather Goods";
  const title = document.querySelector("#category-title");
  const breadcrumb = document.querySelector("#category-crumb");

  if (title) title.textContent = category;
  if (breadcrumb) breadcrumb.textContent = category;

  const categoryProducts = products.filter((product) => product.category === category);
  grid.innerHTML = categoryProducts.map(productCard).join("");
}

// Forms show a local confirmation because this static demo has no server endpoint.
function initializeDemoForms() {
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast(form.dataset.success || "Thank you. Your message has been received.");
      form.reset();
    });
  });
}

function initializeCheckout() {
  const checkout = document.querySelector("[data-checkout]");
  if (!checkout) return;

  checkout.addEventListener("submit", (event) => {
    event.preventDefault();
    const orderReference = `AS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    localStorage.setItem("aether-last-order", orderReference);
    writeCart([]);
    checkout.innerHTML = `
      <div class="empty">
        <div class="eyebrow">Order received</div>
        <h2>Thank you for choosing handmade.</h2>
        <p>Your demo order reference is <b>${orderReference}</b>.
          Our team will be in touch to confirm delivery and payment.</p>
        <a class="button" href="shop.html">Continue exploring</a>
      </div>`;
  });
}

// Admin entry controls store mock entries in this browser only.
function initializeAdminDemo() {
  document.querySelectorAll("[data-admin-table]").forEach((table) => {
    const rows = JSON.parse(localStorage.getItem("aether-admin-rows") || "[]");
    if (!rows.length) return;

    table.querySelector("tbody").innerHTML += rows.map((row) => `
      <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}
        <td><span class="status pending">New</span></td>
      </tr>`).join("");
  });

  document.querySelectorAll("[data-admin-add]").forEach((button) => {
    button.addEventListener("click", () => {
      const name = window.prompt("Product or request name");
      if (!name) return;

      const rows = JSON.parse(localStorage.getItem("aether-admin-rows") || "[]");
      rows.push([name, "New entry", "—", "Today"]);
      localStorage.setItem("aether-admin-rows", JSON.stringify(rows));
      window.location.reload();
    });
  });
}

// Initialize shared and page-specific behaviors after the document is ready.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-site-header]").forEach((element) => {
    element.innerHTML = siteHeader;
  });
  document.querySelectorAll("[data-site-footer]").forEach((element) => {
    element.innerHTML = siteFooter;
  });
  document.querySelectorAll("[data-social-links]").forEach((element) => {
    element.innerHTML = socialLinks;
  });

  updateCartCount();
  renderProducts(".product-grid[data-products]");
  renderProductDetail();
  renderCart();
  initializeShop();
  initializeCategory();
  initializeDemoForms();
  initializeCheckout();
  initializeAdminDemo();

  document.querySelector(".mobile-menu")?.addEventListener("click", () => {
    document.querySelector(".nav-links")?.classList.toggle("open");
  });

  // Product detail HTML is rendered above; this listener covers static add buttons.
  document.querySelectorAll("[data-add]:not([data-product-detail] [data-add])")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const quantity = Number(document.querySelector("#quantity")?.value || 1);
        addToCart(button.dataset.add, quantity);
      });
    });
});
