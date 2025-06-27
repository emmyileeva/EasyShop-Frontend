function showLoginForm() {
  templateBuilder.build("login-form", {}, "login");
}

function hideModalForm() {
  templateBuilder.clear("login");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  userService.login(username, password);
  hideModalForm();
}

function showImageDetailForm(product, imageUrl) {
  const imageDetail = {
    name: product,
    imageUrl: imageUrl,
  };

  templateBuilder.build("image-detail", imageDetail, "login");
}

function loadHome() {
  templateBuilder.build("home", {}, "main", () => {
    // Add home layout class to main after rendering
    document.getElementById("main").className = "main-home";

    productService.search();
    categoryService.getAllCategories((categories) => {
      loadCategories(categories);
      setTimeout(() => {
        checkIfFiltersAreActive();
      }, 200);
    });
  });
}

function editProfile() {
  profileService.loadProfile(() => {
    // Only change layout after profile content is injected
    document.getElementById("main").className = "";
  });
}

function saveProfile() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;

  const profile = {
    firstName,
    lastName,
    phone,
    email,
    address,
    city,
    state,
    zip,
  };

  profileService.updateProfile(profile);
}

function showCart() {
  cartService.loadCartPage();
}

function clearCart() {
  cartService.clearCart();
  cartService.loadCartPage();
}

function setCategory(control) {
  productService.addCategoryFilter(control.value);
  productService.search();
  checkIfFiltersAreActive();
}

function setColor(control) {
  productService.addColorFilter(control.value);
  productService.search();
  checkIfFiltersAreActive();
}

function setMinPrice(control) {
  // const slider = document.getElementById("min-price");
  const label = document.getElementById("min-price-display");
  label.innerText = control.value;

  const value = control.value != 0 ? control.value : "";
  productService.addMinPriceFilter(value);
  productService.search();
  checkIfFiltersAreActive();
}

function setMaxPrice(control) {
  // const slider = document.getElementById("min-price");
  const label = document.getElementById("max-price-display");
  label.innerText = control.value;

  const value = control.value != 1500 ? control.value : "";
  productService.addMaxPriceFilter(value);
  productService.search();
  checkIfFiltersAreActive();
}

function closeError(control) {
  setTimeout(() => {
    control.click();
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  loadHome();
});
