import { transliterate } from "./helpers.js";

const WIDTH = window.innerWidth;
const IS_MOBILE = WIDTH < 1280;

const renderCard = (card) =>
  `<div class="card">
      <img src="${card?.image}" class="card-image">
      <span class="card-title">${card?.title}</span>
      <span class="card-subtitle">${card?.subtitle}</span>
      
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

const renderMenuMobile = (data) => {
  const main = document.getElementById("menu-main");
  main.innerHTML = "";

  const categories = Object.keys(data);

  categories.forEach((cat) => {
    const idSection = `menu-main-${transliterate(cat)}`;
    main.insertAdjacentHTML("beforeEnd", `<div id="${idSection}"></div>`);

    const section = document.querySelector(`#${idSection}:last-of-type`);

    section.insertAdjacentHTML("beforeEnd", `<h1 id="menu-main-title">${cat}</h1>`);
    section.insertAdjacentHTML("beforeEnd", `<div id="menu-main-grid"></div>`);

    // const grid = document.querySelector("#menu-main-grid:last-of-type");
    // data[cat].forEach((card) => grid.insertAdjacentHTML("beforeend", renderCard(card)));
  });
};

const renderMenuItems = (data) => {
  if (IS_MOBILE) {
    renderMenuMobile(data);
  } else {
    // renderMenuDesktop(data);
  }
};

export { renderMenuCategories, renderMenuItems };
