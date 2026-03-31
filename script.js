document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const bookCards = document.querySelectorAll(".book-card");
  const noResultsMessage = document.getElementById("noResultsMessage");

  let currentFilter = "all";

  function normalizeText(value) {
    return (value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function filterBooks() {
    const searchValue = normalizeText(searchInput?.value);
    let visibleCount = 0;

    bookCards.forEach((card) => {
      const title = normalizeText(card.querySelector("h3")?.textContent);
      const category = normalizeText(card.dataset.category);
      const visibleCategory = normalizeText(card.querySelector(".category")?.textContent);
      const excerpt = normalizeText(card.querySelector(".excerpt")?.textContent);

      const matchesFilter = currentFilter === "all" || category === currentFilter;
      const matchesSearch =
        searchValue === "" ||
        title.includes(searchValue) ||
        category.includes(searchValue) ||
        visibleCategory.includes(searchValue) ||
        excerpt.includes(searchValue);

      const shouldShow = matchesFilter && matchesSearch;

      card.style.display = shouldShow ? "flex" : "none";

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (noResultsMessage) {
      noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      currentFilter = normalizeText(button.dataset.filter);
      filterBooks();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterBooks);
  }

  filterBooks();
});