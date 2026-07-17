let cart = [];

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
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
        <p>₹${item.price} × ${item.quantity}</p>
      </div>
      <button class="remove-item-btn" data-id="${item.id}">Remove</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  document.getElementById("cartTotal").textContent = total;
}

// Add to cart button clicks
document.getElementById("productGrid").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

// Remove item clicks (inside cart panel)
document.getElementById("cartItems").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item-btn")) {
    const productId = parseInt(e.target.dataset.id);
    removeFromCart(productId);
  }
});

// Open/close cart panel
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");

document.getElementById("cartIcon").addEventListener("click", () => {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("active");
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("active");
});