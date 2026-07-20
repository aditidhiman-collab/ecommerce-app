// Runs only on product.html
(function () {
  const root = document.getElementById("productDetailRoot");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = products.find(p => p.id === productId);

  if (!product) {
    root.innerHTML = `
      <div class="not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <a href="index.html" class="place-order-btn">Back to Products</a>
      </div>
    `;
    return;
  }

  document.title = `ShopEasy - ${product.name}`;
  document.getElementById("breadcrumbName").textContent = product.name;

  const inStock = product.stock > 0;

  root.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-detail-info">
        <h2>${product.name}</h2>
        <span class="product-detail-category">${product.category}</span>
        <p class="product-detail-price">₹${product.price}</p>
        <p class="product-detail-description">${product.description || ""}</p>
        <p class="product-detail-stock ${inStock ? "in-stock" : "out-of-stock"}">
          ${inStock ? `In Stock (${product.stock} available)` : "Out of Stock"}
        </p>
        <div class="detail-qty-row">
          <div class="quantity-controls">
            <button class="qty-btn" id="detailDecreaseBtn">−</button>
            <span id="detailQty">1</span>
            <button class="qty-btn" id="detailIncreaseBtn">+</button>
          </div>
          <button class="detail-add-to-cart-btn" id="detailAddToCartBtn" ${inStock ? "" : "disabled"}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  let selectedQty = 1;
  const qtyDisplay = document.getElementById("detailQty");
  const maxQty = product.stock > 0 ? product.stock : 1;

  document.getElementById("detailIncreaseBtn").addEventListener("click", () => {
    if (selectedQty < maxQty) {
      selectedQty += 1;
      qtyDisplay.textContent = selectedQty;
    }
  });

  document.getElementById("detailDecreaseBtn").addEventListener("click", () => {
    if (selectedQty > 1) {
      selectedQty -= 1;
      qtyDisplay.textContent = selectedQty;
    }
  });

  const addBtn = document.getElementById("detailAddToCartBtn");
  if (inStock) {
    addBtn.addEventListener("click", () => {
      for (let i = 0; i < selectedQty; i++) {
        addToCart(product.id);
      }
      cartPanel.classList.add("open");
      cartOverlay.classList.add("active");
    });
  }
})();