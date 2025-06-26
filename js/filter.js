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

  // Reset filters in the productService (this part is important!)
  productService.addCategoryFilter(0);
  productService.addMinPriceFilter("");
  productService.addMaxPriceFilter("");
  productService.addColorFilter("");

  // Re-run product search to show everything
  productService.search();
}

document.addEventListener("DOMContentLoaded", () => {});
