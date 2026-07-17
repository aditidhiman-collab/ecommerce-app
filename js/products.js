// Product data
const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, category: "Electronics", image: "https://placehold.co/220x180?text=Headphones" },
  { id: 2, name: "Smart Watch", price: 2999, category: "Electronics", image: "https://placehold.co/220x180?text=Smart+Watch" },
  { id: 3, name: "Backpack", price: 999, category: "Accessories", image: "https://placehold.co/220x180?text=Backpack" },
  { id: 4, name: "Bluetooth Speaker", price: 1799, category: "Electronics", image: "https://placehold.co/220x180?text=Speaker" },
  { id: 5, name: "Sunglasses", price: 599, category: "Accessories", image: "https://placehold.co/220x180?text=Sunglasses" },
  { id: 6, name: "Desk Lamp", price: 799, category: "Home", image: "https://placehold.co/220x180?text=Desk+Lamp" }
];

// Render products into the grid
function renderProducts(productList = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  productList.forEach(product => {
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

// Filtering and sorting
function applyFiltersAndSort() {
  const category = document.getElementById("categoryFilter").value;
  const sortOrder = document.getElementById("sortPrice").value;

  let filtered = category === "all"
    ? [...products]
    : products.filter(p => p.category === category);

  if (sortOrder === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

if (document.getElementById("categoryFilter")) {
  document.getElementById("categoryFilter").addEventListener("change", applyFiltersAndSort);
  document.getElementById("sortPrice").addEventListener("change", applyFiltersAndSort);
}

renderProducts();