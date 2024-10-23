import { useEffect, useState } from "react";
import { useWindowDimensions } from "hooks";
import { getPrice } from "services";
import "./Menu.css";
import { Loader } from "components";

const Menu = () => {
  const { isMobile } = useWindowDimensions();

  const [load, setLoad] = useState(true);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getPrice()
      .then((res) => {
        setData(res);
        setCategories(Object.keys(res).map((cat) => ({ id: res[cat]?.id, title: res[cat]?.title })));
        setTimeout(() => setLoad(false), 2500);
      })
      .catch(() => console.error("Ошибка загрузки прайса."));
  }, []);

  if (load) {
    return (
      <div id="menu">
        <div id="loader-wrap">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div id="menu">
      <div id="menu-container">
        {isMobile ? <CategoriesMobile {...{ categories }} /> : <CategoriesDesktop {...{ categories }} />}
        {data ? <MenuMain /> : null}
      </div>
    </div>
  );
};

export default Menu;

const CategoriesMobile = () => <div id="menu-categories-mobile"></div>;

const CategoriesDesktop = () => <div id="menu-categories-desktop"></div>;

const MenuMain = () => <div id="menu-main"></div>;
