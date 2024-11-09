import useWindowDimensions from "../hooks/useWindowDimensions.js";
import "./CategoriesDesktop.css";
import "./CategoriesMobile.css";

const Categories = (props) => {
  const { isMobile } = useWindowDimensions();
  if (isMobile) return <CategoriesMobile {...props} />;
  return <CategoriesDesktop {...props} />;
};

export default Categories;

const CategoriesMobile = ({ categories, selectedCategory, onPressCategory = () => {} }) => (
  <div id="menu-categories-mobile">
    {categories.map((cat) => {
      const active = cat?.id === selectedCategory?.id ? " active" : "";

      return (
        <a
          key={cat?.id}
          id={cat?.id}
          className={`category-button${active}`}
          href={`#menu-main-${cat?.id}`}
          onClick={() => onPressCategory(cat)}
        >
          {cat?.title}

          {cat?.count ? (
            <div id="header-basket-badge-wrap">
              <span id="header-basket-badge-counter">{cat?.count}</span>
            </div>
          ) : null}
        </a>
      );
    })}
  </div>
);

const CategoriesDesktop = ({ categories, selectedCategory, onPressCategory = () => {} }) => (
  <div id="menu-categories-desktop">
    {categories.map((cat) => {
      const active = cat?.id === selectedCategory?.id ? " active" : "";

      return (
        <button key={cat?.id} id={cat?.id} className={`category-button${active}`} onClick={() => onPressCategory(cat)}>
          {cat?.title}

          {cat?.count ? (
            <div id="header-basket-badge-wrap">
              <span id="header-basket-badge-counter">{cat?.count}</span>
            </div>
          ) : null}
        </button>
      );
    })}
  </div>
);
