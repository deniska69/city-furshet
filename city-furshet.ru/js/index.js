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
  renderMenuItems(categories, data, selectedCategory);
};

const handlePressCategory = (e) => {
  document.getElementById(selectedCategory?.id).classList.remove("active");
  selectedCategory = categories.find((el) => el?.title === e?.target?.innerText);
  document.getElementById(selectedCategory?.id).classList.add("active");

  if (!IS_MOBILE) renderMenuItems(categories, data, selectedCategory);
};

let xStart = null,
  yStart = null,
  xDiff = null,
  yDiff = null;

const handleTouchStart = (e) => {
  xStart = null;
  yStart = null;
  xDiff = null;
  yDiff = null;

  if (e.target.closest(".card")) {
    xStart = e.touches[0]?.clientX;
    yStart = e.touches[0]?.clientY;
  }
};

const handleTouchMove = (e) => {
  if (!xStart || !yStart || !e.target.closest(".card")) return;
  xDiff = xStart - e.touches[0]?.clientX;
  yDiff = yStart - e.touches[0]?.clientY;
};

const handleTouchEnd = (e) => {
  if (!xDiff && !yDiff && !!e.target.closest(".card")) {
    const id = e.target.closest(".card")?.id;
    console.log({ id });
  }
};

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);
