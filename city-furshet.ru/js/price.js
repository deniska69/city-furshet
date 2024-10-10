const WIDTH = window.innerWidth;

let data = {};
let categorySelected = "";
let basket = [];

const decode = (responseArrayBuffer) => {
  const dataView = new DataView(responseArrayBuffer);
  const decoder = new TextDecoder("windows-1251");
  return decoder.decode(dataView);
};

const xhrArrayBuffer = new XMLHttpRequest();
xhrArrayBuffer.responseType = "arraybuffer";

$.ajax({
  url: "city-furshet.ru/Price.csv",
  method: "GET",
  xhr: () => xhrArrayBuffer,
  success: (data) => processing(decode(data)),
});

const processingString = (s) => s.trim().replaceAll("  ", "").replaceAll("\n", "").replaceAll("\r");

const processing = (string) => {
  let arr = string.split("\n");

  arr.forEach((el, index) => {
    if (index > 0) {
      const row = el.split(";");

      if (row[0]) {
        if (!data[row[0]]) {
          data[row[0]] = [];
        }

        data[processingString(row[0])].push({
          category: processingString(row[0]),
          image: processingString(row[1]) || "city-furshet.ru/images/image_placeholder.jpg",
          title: processingString(row[2]),
          price: processingString(row[3]),
          subtitle: processingString(row[4]),
          description: processingString(row[5]),
        });
      }
    }
  });

  categorySelected = Object.keys(data)[0];

  if (WIDTH > 1279) {
    const categories = document.getElementById("block_2-aside-left");

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

    renderMenuDesktop();
  } else {
    renderMenuMobile();
  }
};

const handlePressCategory = (e) => {
  document.getElementById(categorySelected).classList.remove("active");
  document.getElementById(e?.target?.innerText).classList.add("active");
  categorySelected = e?.target?.innerText;

  if (WIDTH > 1279) renderMenuDesktop();
};

const renderCard = (card) => {
  return `<div class="card">
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
};

const renderMenuDesktop = () => {
  const main = document.getElementById("block_2-main");
  main.innerHTML = "";
  main.insertAdjacentHTML("afterBegin", `<h1 id="block_2-main-title">${categorySelected}</h1>`);
  main.insertAdjacentHTML("beforeEnd", `<div id="block_2-main-grid"></div>`);

  const grid = document.getElementById("block_2-main-grid");
  data[cat].forEach((card) => grid.insertAdjacentHTML("beforeend", renderCard(card)));
};

const renderMenuMobile = () => {
  const main = document.getElementById("block_2-main");
  main.innerHTML = "";

  const categories = Object.keys(data);

  categories.forEach((cat) => {
    main.insertAdjacentHTML("beforeEnd", `<h1 id="block_2-main-title">${cat}</h1>`);
    main.insertAdjacentHTML("beforeEnd", `<div id="block_2-main-grid"></div>`);

    const grid = document.querySelector("#block_2-main-grid:last-of-type");
    data[cat].forEach((card) => grid.insertAdjacentHTML("beforeend", renderCard(card)));
  });
};
