const WIDTH = window.innerWidth;
const IS_MOBILE = WIDTH < 1280;

const renderCard = (card) =>
  `<div class="card">
      <div class="card-info">
        <img src="${card?.image}" class="card-image">
        <span class="card-title">${card?.title}</span>
        <span class="card-subtitle">${card?.subtitle}</span>
      </div>
      
      <div class="card-buttons">
        <button id="minus-${card?.category}-${card?.title}" class="card-btn-minus">
          <span class="card-minus">-</span>
        </button>
  
        <button id="add-${card?.category}-${card?.title}" class="card-btn-plus">
          <span class="card-price">${card?.price} ₽</span>
          <span class="card-add">+</span>
        </button>
      </div>
    </div>`;

const renderMenuCategories = (categories, selectedCategory, onPress) => {
  const el = document.getElementById(`menu-categories-${IS_MOBILE ? "mobile" : "desktop"}`);

  const typeEl = IS_MOBILE ? "a" : "button";

  categories.forEach((cat) => {
    const active = cat?.id === selectedCategory?.id ? " active" : "";

    el.insertAdjacentHTML(
      "beforeend",
      `<${typeEl} id="${cat?.id}" class="category-button${active}">${cat?.title}</${typeEl}>`
    );
  });

  categories.forEach((cat) => {
    const button = document.getElementById(cat?.id);
    button.addEventListener("click", (e) => onPress(e));
  });
};

const renderMenuItemsMobile = (categories, data) => {
  const main = document.getElementById("menu-main");
  main.innerHTML = "";

  categories.forEach((cat) => {
    const idSection = `menu-main-${cat?.id}`;
    main.insertAdjacentHTML("beforeEnd", `<div id="${idSection}" class="menu-section"></div>`);

    const section = document.querySelector(`#${idSection}:last-of-type`);
    section.insertAdjacentHTML("beforeEnd", `<h1 id="menu-main-title"">${cat?.title}</h1>`);

    const idGrid = `menu-main-grid-${cat?.id}`;
    section.insertAdjacentHTML("beforeEnd", `<div id="${idGrid}" class="menu-items"></div>`);

    const grid = document.getElementById(idGrid);
    data[cat?.id]?.items.forEach((card) => grid.insertAdjacentHTML("beforeend", renderCard(card)));
  });
};

const renderMenuItemsDesktop = (data) => {};

const renderMenuItems = (...args) => {
  if (IS_MOBILE) {
    renderMenuItemsMobile(...args);
  } else {
    renderMenuItemsDesktop(...args);
  }
};

export { renderMenuCategories, renderMenuItems };
