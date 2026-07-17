// This runs only on checkout.html
if (document.getElementById("checkoutItems")) {
  const checkoutItemsDiv = document.getElementById("checkoutItems");
  let total = 0;

  checkoutItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    checkoutItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>
    `;
    checkoutItemsDiv.appendChild(div);
  });

  document.getElementById("checkoutTotal").textContent = total;

  document.getElementById("placeOrderBtn").addEventListener("click", () => {
    alert("Order placed successfully! 🎉");
    cart = [];
    saveCartToStorage();
    window.location.href = "index.html";
  });
}