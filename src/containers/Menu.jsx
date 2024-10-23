import { useEffect, useState } from "react";
import { getPrice } from "services";
import "./Menu.css";
import { Categories, Loader } from "components";

const Menu = () => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getPrice()
      .then((res) => {
        setData(res);
        const _categories = Object.keys(res).map((cat) => ({ id: res[cat]?.id, title: res[cat]?.title }));
        setCategories(_categories);
        setSelectedCategory(_categories[0]);
        setTimeout(() => setLoad(false), 2500);
      })
      .catch(() => console.error("Ошибка загрузки прайса."));
  }, []);

  const handlePressCategory = (cat) => setSelectedCategory(cat);

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
        {categories && selectedCategory ? (
          <Categories {...{ categories, selectedCategory, onPress: handlePressCategory }} />
        ) : null}
        {data ? <MenuMain /> : null}
      </div>
    </div>
  );
};

export default Menu;

const MenuMain = () => <div id="menu-main"></div>;
