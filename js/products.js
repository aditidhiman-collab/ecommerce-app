// Product data
const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, image: "https://placehold.co/220x180?text=Headphones" },
  { id: 2, name: "Smart Watch", price: 2999, image: "https://placehold.co/220x180?text=Smart+Watch" },
  { id: 3, name: "Backpack", price: 999, image: "https://placehold.co/220x180?text=Backpack" },
  { id: 4, name: "Bluetooth Speaker", price: 1799, image: "https://placehold.co/220x180?text=Speaker" },
  { id: 5, name: "Sunglasses", price: 599, image: "https://placehold.co/220x180?text=Sunglasses" },
  { id: 6, name: "Desk Lamp", price: 799, image: "https://placehold.co/220x180?text=Desk+Lamp" }
];

// Render products into the grid
function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-price">₹${product.price}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderProducts();