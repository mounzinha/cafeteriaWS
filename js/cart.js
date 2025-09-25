// cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

// Formata o valor em reais (BRL)
const formatarPreco = (valor) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

// Atualiza a exibição do carrinho
function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total");
  if (!cartList || !totalElement) return;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Seu carrinho está vazio.</li>";
  } else {
    cart.forEach((item, index) => {
      let li = document.createElement("li");
      li.textContent = `${item.name} - ${formatarPreco(item.price)} `;
      let btn = document.createElement("button");
      btn.textContent = "X";
      btn.setAttribute("aria-label", `Remover ${item.name} do carrinho`);
      btn.onclick = () => removeFromCart(index);
      li.appendChild(btn);
      cartList.appendChild(li);
    });
  }

  total = cart.reduce((sum, item) => sum + item.price, 0);
  totalElement.textContent = formatarPreco(total);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Adiciona item ao carrinho
function addToCart(name, price) {
  if (typeof price !== "number" || isNaN(price)) return;
  cart.push({ name, price });
  total += price;
  updateCart();
}

// Remove item do carrinho
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

// Inicializa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  updateCart();

  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll(".item").forEach((item) => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(term) ? "block" : "none";
      });
    });
  }
});
