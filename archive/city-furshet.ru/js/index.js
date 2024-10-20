import { readCSV } from "./helpers.js";
import { renderMenuCategories, renderMenuItems, renderBasketButton } from "./renders.js";
import Basket from "./basket.js";

const basket = new Basket();

const IS_MOBILE = window.innerWidth < 1280;

let data = {};
let categories = [];
let selectedCategory = null;

readCSV().then((res) => start(res));

const start = (res) => {
  data = res;
  categories = Object.keys(data).map((cat) => ({ id: data[cat]?.id, title: data[cat]?.title }));
  selectedCategory = categories[0];

  basket.init();

  renderMenuCategories(categories, selectedCategory, handlePressCategory);
  renderMenuItems(categories, data, selectedCategory, handlePressCard);
  renderBasketButton(basket.totalCount());
};

const handlePressCategory = (e) => {
  document.getElementById(selectedCategory?.id).classList.remove("active");
  selectedCategory = categories.find((el) => el?.title === e?.target?.innerText);
  document.getElementById(selectedCategory?.id).classList.add("active");

  if (!IS_MOBILE) renderMenuItems(categories, data, selectedCategory, handlePressCard);
};

const handlePressCard = (item, action = true) => {
  if (!item) return alert("no id card");

  switch (action) {
    case "modal":
      // alert("work in progress.");
      console.log(basket.items);
      console.log(basket.totalCount());
      break;
    case "plus":
      document.getElementById(`${item?.id}-minus`).classList.remove("hide");
      basket.add(item);
      break;
    case "minus":
      basket.remove(item);

      if (basket.count(item) < 1) {
        document.getElementById(`${item?.id}-minus`).classList.add("hide");
      }
      break;
  }

  renderBasketButton(basket.totalCount());
};
