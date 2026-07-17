// Simple cart logic (in-memory for now)
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
}

// Listen for "Add to Cart" clicks (event delegation)
document.getElementById("productGrid").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});