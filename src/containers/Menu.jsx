import { useEffect, useState } from "react";
import { getPrice } from "services";
import { useWindowDimensions } from "hooks";
import { Card, Categories, Loader } from "components";

import "./Menu.css";

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

  const onPressCategory = (cat) => setSelectedCategory(cat);

  const onPressCard = () => console.log("onPressCard");

  const onPressPlus = () => console.log("onPressPlus");

  const onPressMinus = () => console.log("onPressMinus");

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
        {categories && selectedCategory ? <Categories {...{ categories, selectedCategory, onPressCategory }} /> : null}

        {data ? (
          <MenuMain
            {...{
              data,
              categories,
              selectedCategory,
              onPressCard,
              onPressPlus,
              onPressMinus,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Menu;

const MenuMain = (props) => {
  const { data, categories, selectedCategory, onPressCard, onPressPlus, onPressMinus } = props;

  const { isMobile } = useWindowDimensions();

  const sections = isMobile ? categories : [selectedCategory];

  return (
    <div id="menu-main">
      {sections.map((section) => {
        const idSection = `menu-main-${section?.id}`;
        const idGrid = `menu-main-grid-${section?.id}`;
        const cards = data[section?.id]?.items;

        return (
          <div key={idSection} id={idSection} className="menu-section">
            <h1 id="menu-main-title">{section?.title}</h1>

            <div id={idGrid} className="menu-items">
              {cards.map((card) => (
                <Card key={card?.id} {...card} {...{ onPressCard, onPressPlus, onPressMinus }} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
