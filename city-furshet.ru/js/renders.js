const IS_MOBILE = window.innerWidth < 1280;

const renderCard = (card) =>
  `<div id="${card?.id}" class="card noselect">
      <div class="card-info">
        <img src="${card?.image}" class="card-image">
        <span class="card-title">${card?.title}</span>
        <span class="card-subtitle">${card?.subtitle}</span>
      </div>
      
      <div class="card-buttons">
        <button 
          id="${card?.id}-minus" 
          class="card-btn-minus hide">
          <img src="city-furshet.ru/images/minus.svg" >
        </button>
  
        <button 
          id="${card?.id}-plus" 
          class="card-btn-plus">
          <span class="card-price">${card?.price} ₽</span>
           <img src="city-furshet.ru/images/plus.svg" >
        </button>
      </div>
    </div>`;

const renderMenuCategories = (categories, selectedCategory, onPress) => {
  const el = document.getElementById(`menu-categories-${IS_MOBILE ? "mobile" : "desktop"}`);

  categories.forEach((cat) => {
    const active = cat?.id === selectedCategory?.id ? " active" : "";

    const elMobile = `<a id="${cat?.id}" class="category-button${active}" href="#menu-main-${cat?.id}">${cat?.title}</a>`;
    const elDesktop = `<button id="${cat?.id}" class="category-button${active}">${cat?.title}</button>`;

    el.insertAdjacentHTML("beforeend", IS_MOBILE ? elMobile : elDesktop);
  });

  categories.forEach((cat) => {
    const button = document.getElementById(cat?.id);
    button.addEventListener("click", (e) => onPress(e));
  });
};

const renderMenuItems = (categories, data, selectedCategory, onPress) => {
  const listCategories = IS_MOBILE ? categories : [selectedCategory];

  const main = document.getElementById("menu-main");
  main.innerHTML = "";

  listCategories.forEach((cat) => {
    const idSection = `menu-main-${cat?.id}`;
    main.insertAdjacentHTML("beforeEnd", `<div id="${idSection}" class="menu-section"></div>`);

    const section = document.querySelector(`#${idSection}:last-of-type`);
    section.insertAdjacentHTML("beforeEnd", `<h1 id="menu-main-title"">${cat?.title}</h1>`);

    const idGrid = `menu-main-grid-${cat?.id}`;
    section.insertAdjacentHTML("beforeEnd", `<div id="${idGrid}" class="menu-items"></div>`);

    const grid = document.getElementById(idGrid);
    data[cat?.id]?.items.forEach((card) => {
      grid.insertAdjacentHTML("beforeend", renderCard(card));

      const elCard = document.getElementById(card?.id);
      const btnMinus = document.getElementById(`${card?.id}-minus`);
      const btnPlus = document.getElementById(`${card?.id}-plus`);

      elCard.addEventListener("click", () => onPress(card?.id, true));
      btnMinus.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        onPress(card?.id, false);
      });
      btnPlus.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        onPress(card?.id, true);
      });
    });
  });
};

export { renderMenuCategories, renderMenuItems };
