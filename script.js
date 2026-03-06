document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const bookCards = document.querySelectorAll(".book-card");

  let currentFilter = "all";

  function filterBooks() {
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";

    bookCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const category = card.dataset.category.toLowerCase();
      const excerpt = card.querySelector(".excerpt").textContent.toLowerCase();

      const matchesFilter = currentFilter === "all" || category === currentFilter;
      const matchesSearch =
        title.includes(searchValue) ||
        category.includes(searchValue) ||
        excerpt.includes(searchValue);

      card.style.display = matchesFilter && matchesSearch ? "flex" : "none";
    });
  }

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        filterBooks();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterBooks);
  }
});