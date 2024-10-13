import { readCSV } from "./helpers.js";
import { renderMenuCategories, renderMenuItems } from "./renders.js";

let data = {};
let categories = [];
let selectedCategory = null;

readCSV().then((res) => start(res));

const start = (res) => {
  data = res;
  categories = Object.keys(data).map((cat) => ({ id: data[cat]?.id, title: data[cat]?.title }));
  selectedCategory = categories[0];

  renderMenuCategories(categories, selectedCategory, handlePressCategory);
  renderMenuItems(categories, data);
};

const handlePressCategory = (e) => {
  document.getElementById(selectedCategory?.id).classList.remove("active");
  selectedCategory = categories.find((el) => el?.title === e?.target?.innerText);
  document.getElementById(selectedCategory?.id).classList.add("active");
};
