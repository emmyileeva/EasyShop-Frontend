let cartService;

class ShoppingCartService {
  cart = {
    items: [],
    total: 0,
  };

  addToCart(productId) {
    const url = `${config.baseUrl}/cart/products/${productId}`;
    // const headers = userService.getHeaders();

    axios
      .post(url, {}) // ,{headers})
      .then((response) => {
        this.setCart(response.data);

        this.updateCartDisplay();
      })
      .catch((error) => {
        const data = {
          error: "Add to cart failed.",
        };

        templateBuilder.append("error", data, "errors");
      });
  }

  setCart(data) {
    this.cart = {
      items: [],
      total: 0,
    };

    this.cart.total = data.total;

    for (const [key, value] of Object.entries(data.items)) {
      this.cart.items.push(value);
    }
  }

  loadCart() {
    const url = `${config.baseUrl}/cart`;

    axios
      .get(url)
      .then((response) => {
        this.setCart(response.data);

        this.updateCartDisplay();
      })
      .catch((error) => {
        const data = {
          error: "Load cart failed.",
        };

        templateBuilder.append("error", data, "errors");
      });
  }

  loadCartPage() {
    const main = document.getElementById("main");
    main.innerHTML = "";

    // Ensure main is flex-centered
    main.style.display = "flex";
    main.style.justifyContent = "center";

    // Wrapper for centering
    const wrapper = document.createElement("div");
    wrapper.classList.add("cart-wrapper");

    // Content container
    const contentDiv = document.createElement("div");
    contentDiv.id = "content";
    contentDiv.classList.add("content-form");

    wrapper.appendChild(contentDiv);
    main.appendChild(wrapper);

    // Header with title + clear button
    const cartHeader = document.createElement("div");
    cartHeader.classList.add("cart-header");

    const h1 = document.createElement("h1");
    h1.innerText = "Cart";
    cartHeader.appendChild(h1);

    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger");
    button.innerText = "Clear";
    button.addEventListener("click", () => this.clearCart());
    cartHeader.appendChild(button);

    contentDiv.appendChild(cartHeader);

    // Empty cart message
    if (this.cart.items.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.style.textAlign = "center";
      emptyMsg.style.padding = "40px 0";

      const emoji = document.createElement("div");
      emoji.innerText = "🛒";
      emoji.style.fontSize = "2.5rem";
      emoji.style.marginBottom = "10px";

      const msg = document.createElement("h5");
      msg.innerText = "Your cart is empty!";
      msg.style.color = "#6a4c38";

      const sub = document.createElement("p");
      sub.innerText = "Start adding items to see them here.";
      sub.style.color = "#888";
      sub.style.marginTop = "5px";

      emptyMsg.appendChild(emoji);
      emptyMsg.appendChild(msg);
      emptyMsg.appendChild(sub);
      contentDiv.appendChild(emptyMsg);

      return;
    }

    // Build items
    this.cart.items.forEach((item) => {
      this.buildItem(item, contentDiv);
    });

    const total = document.createElement("h3");
    total.classList.add("cart-total");
    total.innerText = `Total: $${this.cart.total.toFixed(2)}`;
    contentDiv.appendChild(total);

    const note = document.createElement("p");
    note.classList.add("text-muted", "text-end");
    note.innerText = "Review your items before checking out.";
    contentDiv.appendChild(note);
  }

  buildItem(item, parent) {
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("cart-item");

    let div = document.createElement("div");
    outerDiv.appendChild(div);
    let h4 = document.createElement("h4");
    h4.innerText = item.product.name;
    div.appendChild(h4);

    let photoDiv = document.createElement("div");
    photoDiv.classList.add("photo");
    let img = document.createElement("img");
    img.src = `/images/products/${item.product.imageUrl}`;
    img.addEventListener("click", () => {
      showImageDetailForm(item.product.name, img.src);
    });
    photoDiv.appendChild(img);
    let priceH4 = document.createElement("h4");
    priceH4.classList.add("price");
    priceH4.innerText = `$${item.product.price}`;
    photoDiv.appendChild(priceH4);
    outerDiv.appendChild(photoDiv);

    let descriptionDiv = document.createElement("div");
    descriptionDiv.innerText = item.product.description;
    outerDiv.appendChild(descriptionDiv);

    let quantityDiv = document.createElement("div");
    quantityDiv.innerText = `Quantity: ${item.quantity}`;
    outerDiv.appendChild(quantityDiv);

    parent.appendChild(outerDiv);
  }

  clearCart() {
    const url = `${config.baseUrl}/cart`;

    axios
      .delete(url)
      .then((response) => {
        this.setCart(response.data);
        this.updateCartDisplay();
        this.loadCartPage();
      })
      .catch((error) => {
        const data = {
          error: "Empty cart failed.",
        };

        templateBuilder.append("error", data, "errors");
      });
  }

  updateCartDisplay() {
    try {
      const itemCount = this.cart.items.length;
      const cartControl = document.getElementById("cart-items");

      cartControl.innerText = itemCount;
    } catch (e) {}
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cartService = new ShoppingCartService();

  if (userService.isLoggedIn()) {
    cartService.loadCart();
  }
});
