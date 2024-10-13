const WIDTH = window.innerWidth;

const renderMenuCategories = (data, categorySelected) => {
  const categories = document.getElementById(`menu-categories-${WIDTH > 1279 ? "desktop" : "mobile"}`);

  Object.keys(data).forEach((cat) => {
    categories.insertAdjacentHTML(
      "beforeend",
      `<button id="${cat}" class="category-button ${cat === categorySelected ? "active" : ""}">${cat}</button>`
    );
  });

  Object.keys(data).forEach((cat) => {
    const button = document.getElementById(cat);
    button.addEventListener("click", (e) => handlePressCategory(e));
  });
};

const renderMenuDesktop = () => {
  const main = document.getElementById("menu-main");
  main.innerHTML = "";
  main.insertAdjacentHTML("afterBegin", `<h1 id="menu-main-title">${categorySelected}</h1>`);
  main.insertAdjacentHTML("beforeEnd", `<div id="menu-main-grid"></div>`);

  const grid = document.getElementById("menu-main-grid");
  data[categorySelected].forEach((card) => grid.insertAdjacentHTML("beforeend", renderCard(card)));
};

export { renderMenuCategories, renderMenuDesktop };
