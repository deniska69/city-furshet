const IS_MOBILE = window.innerWidth < 1280;

if (!IS_MOBILE) {
  const headerMobile = document.getElementById("header-mobile");
  const headerDesktop = document.getElementById("header-desktop");

  window.addEventListener("scroll", (e) => {
    const pos = (document.documentElement || document.body.parentNode || document.body).scrollTop;

    let scroll = Math.round((pos < 200 ? pos : 200) / 4);

    if (headerMobile) {
      headerMobile.style.backgroundColor = `rgba(255, 255, 255, 0.${scroll < 10 ? "0" + scroll : scroll})`;
      headerMobile.style.backdropFilter = `blur(${Math.round((scroll / 10) * 3)}px)`;
    }

    if (headerDesktop) {
      headerDesktop.style.backgroundColor = `rgba(255, 255, 255, 0.${scroll < 10 ? "0" + scroll : scroll})`;
      headerDesktop.style.backdropFilter = `blur(${Math.round((scroll / 10) * 3)}px)`;
    }
  });
}
