const content = document.querySelector("#content");
const basketLabel = document.querySelector("#basket_label");

const decode = (responseArrayBuffer) => {
  const dataView = new DataView(responseArrayBuffer),
    decoder = new TextDecoder("windows-1251");
  return decoder.decode(dataView);
};

let fielsdList = [];
let productsArr = [];
let basketArr = [];

fetch("nomenclature.csv")
  .then((response) => response.arrayBuffer())
  .then(decode)
  .then((data) => parse(data))
  .catch((err) => alert(err?.message));

const parse = (csv) => {
  const arrRows = csv.trim().split("\n");

  let _content = ``;

  arrRows.forEach((row, index) => {
    if (index === 0) {
      fielsdList = row.replace("\r", "").split(";");
    } else {
      const rowArr = row.replace("\r", "").split(";");

      productsPush(rowArr);

      const cardId = rowArr[0];

      let card = ``;

      card += `<img src="images/${rowArr[7]}" />`;
      card += `<span id="title">${rowArr[1]}</span>`;
      card += `<span id="description">${rowArr[2]}</span>`;
      card += `<span id="count_of_persons">Количество персон: ${rowArr[3]}</span>`;
      card += `<span id="weight">Вес: ${rowArr[4]} г.</span>`;
      card += `<span id="price">Цена: ${rowArr[5]} руб.</span>`;
      card += `<button onclick="addToBasket(${cardId})">Добавить в корзину</button>`;

      _content += `<div id="card">${card}</div>`;
    }
  });

  console.log(productsArr);

  content.innerHTML = _content;
};

const productsPush = (arr) => {
  let product = {};

  fielsdList.forEach((key, index) => (product[key] = arr[index]));

  productsArr.push(product);
};

const addToBasket = (id) => {
  console.log(productsArr[id - 1]);

  basketArr.push(productsArr[id - 1]);
  refreshBasketCount();
};

const refreshBasketCount = () => {
  basketLabel.innerHTML = `Корзина${
    basketArr?.length ? " (" + basketArr?.length + ")" : ""
  }`;
};
