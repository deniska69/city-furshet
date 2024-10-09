const header = document.querySelector("#header");
const width = window.innerWidth;

window.addEventListener("scroll", (event) => {
  if (width <= 1279) return;
  let scroll = Math.round((this.scrollY < 200 ? this.scrollY : 200) / 4);
  header.style.backgroundColor = `rgba(255, 255, 255, 0.${scroll < 10 ? "0" + scroll : scroll})`;
  header.style.backdropFilter = `blur(${Math.round((scroll / 10) * 3)}px)`;
});
