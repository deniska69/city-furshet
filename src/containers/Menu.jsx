import { inject, observer } from "mobx-react";
import { useWindowDimensions } from "hooks";
import { Card, Categories, Loader } from "components";

import "./Menu.css";

const Menu = ({ store }) => {
  const loading = store.loading;
  const categories = store.categories;
  const selectedCategory = store.selectedCategory;

  const onPressCategory = (cat) => store.onPressCategory(cat);

  // const onPressCard = () => console.log("onPressCard");

  // const onPressPlus = () => console.log("onPressPlus");

  // const onPressMinus = () => console.log("onPressMinus");

  if (loading) return <LoadPlaceholder />;

  return (
    <div id="menu">
      <div id="menu-container">
        {categories && selectedCategory ? <Categories {...{ categories, selectedCategory, onPressCategory }} /> : null}

        {/* {data ? (
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
        ) : null} */}
      </div>
    </div>
  );
};

export default inject("store")(observer(Menu));

// const MenuMain = (props) => {
//   const { data, categories, selectedCategory, onPressCard, onPressPlus, onPressMinus } = props;

//   const { isMobile } = useWindowDimensions();

//   const sections = isMobile ? categories : [selectedCategory];

//   return (
//     <div id="menu-main">
//       {sections.map((section) => {
//         const idSection = `menu-main-${section?.id}`;
//         const idGrid = `menu-main-grid-${section?.id}`;
//         const cards = data[section?.id]?.items;

//         return (
//           <div key={idSection} id={idSection} className="menu-section">
//             <h1 id="menu-main-title">{section?.title}</h1>

//             <div id={idGrid} className="menu-items">
//               {cards.map((card) => (
//                 <Card key={card?.id} {...card} {...{ onPressCard, onPressPlus, onPressMinus }} />
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

const LoadPlaceholder = () => (
  <div id="menu">
    <div id="loader-wrap">
      <Loader />
    </div>
  </div>
);
