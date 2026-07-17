// --- Storage helpers ---
function saveCartToStorage() {
  localStorage.setItem("shopeasy_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem("shopeasy_cart");
  return saved ? JSON.parse(saved) : [];
}

// Cart state (loaded from storage so it persists across pages)
let cart = loadCartFromStorage();

// --- Core cart logic ---
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = totalItems;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCartToStorage();
  updateCartCount();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartCount();
  renderCart();
}

function increaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) item.quantity += 1;
  saveCartToStorage();
  updateCartCount();
  renderCart();
}

function decreaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
  }
  saveCartToStorage();
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <div class="quantity-controls">
          <button class="qty-btn decrease-btn" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn increase-btn" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-item-btn" data-id="${item.id}">Remove</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  document.getElementById("cartTotal").textContent = total;
}

// --- Event listeners (only bind if elements exist on this page) ---
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  productGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    }
  });
}

const cartItemsContainer = document.getElementById("cartItems");
if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", (e) => {
    const productId = parseInt(e.target.dataset.id);

    if (e.target.classList.contains("remove-item-btn")) {
      removeFromCart(productId);
    } else if (e.target.classList.contains("increase-btn")) {
      increaseQuantity(productId);
    } else if (e.target.classList.contains("decrease-btn")) {
      decreaseQuantity(productId);
    }
  });
}

const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");

if (cartIcon && cartPanel && cartOverlay) {
  cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("open");
    cartOverlay.classList.add("active");
  });

  closeCartBtn.addEventListener("click", () => {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("active");
  });

  cartOverlay.addEventListener("click", () => {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("active");
  });
}

// Initial render on page load
updateCartCount();
renderCart();