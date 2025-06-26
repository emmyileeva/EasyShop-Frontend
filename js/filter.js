function loadCategories(categories) {
  const select = document.getElementById("category-select");

  categories.forEach((c) => {
    const option = document.createElement("option");
    option.setAttribute("value", c.categoryId);
    option.innerText = c.name;
    select.appendChild(option);
  });
}
function clearFilters() {
  // Reset UI controls
  document.getElementById("category-select").value = 0;
  document.getElementById("min-price").value = 0;
  document.getElementById("min-price-display").innerText = 0;
  document.getElementById("max-price").value = 1500;
  document.getElementById("max-price-display").innerText = 1500;

  // Reset color radio buttons
  const colorRadios = document.querySelectorAll('input[name="color"]');
  colorRadios.forEach((r) => (r.checked = r.value === ""));

  // Reset filters in the productService
  productService.addCategoryFilter(0);
  productService.addMinPriceFilter("");
  productService.addMaxPriceFilter("");
  productService.addColorFilter("");

  // Re-run product search to show everything
  productService.search();
  checkIfFiltersAreActive();
}

function checkIfFiltersAreActive() {
  const category = document.getElementById("category-select")?.value;
  const min = document.getElementById("min-price")?.value;
  const max = document.getElementById("max-price")?.value;
  const color = document.querySelector('input[name="color"]:checked')?.value;

  const filtersActive =
    category !== "0" || min !== "0" || max !== "1500" || color !== "";

  const button = document.getElementById("clear-filters-btn");
  if (!button) return;

  if (filtersActive) {
    button.classList.remove("d-none");
    setTimeout(() => button.classList.add("show"), 10); // trigger fade in
  } else {
    button.classList.remove("show");
    setTimeout(() => button.classList.add("d-none"), 400); // wait for fade-out
  }
}
