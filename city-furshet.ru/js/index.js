import { readCSV } from "./helpers.js";
import { renderMenuCategories, renderMenuItems } from "./renders.js";

const IS_MOBILE = window.innerWidth < 1280;

let data = {};
let categories = [];
let selectedCategory = null;

readCSV().then((res) => start(res));

const start = (res) => {
  data = res;
  categories = Object.keys(data).map((cat) => ({ id: data[cat]?.id, title: data[cat]?.title }));
  selectedCategory = categories[0];

  renderMenuCategories(categories, selectedCategory, handlePressCategory);
  renderMenuItems(categories, data, selectedCategory, handlePressCard);
};

const handlePressCategory = (e) => {
  document.getElementById(selectedCategory?.id).classList.remove("active");
  selectedCategory = categories.find((el) => el?.title === e?.target?.innerText);
  document.getElementById(selectedCategory?.id).classList.add("active");

  if (!IS_MOBILE) renderMenuItems(categories, data, selectedCategory, handlePressCard);
};

const handlePressCard = (id, action = true) => {
  if (!id) return alert("no id card");

  if (action) {
    document.getElementById(`${id}-minus`).classList.remove("hide");
  } else {
    document.getElementById(`${id}-minus`).classList.add("hide");
  }
};
