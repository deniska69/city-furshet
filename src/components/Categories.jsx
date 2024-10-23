import { useWindowDimensions } from "hooks";
import "./CategoriesDesktop.css";
import "./CategoriesMobile.css";

const Categories = (props) => {
  const { isMobile } = useWindowDimensions();
  if (isMobile) return <CategoriesMobile {...props} />;
  return <CategoriesDesktop {...props} />;
};

export default Categories;

const CategoriesMobile = ({ categories, selectedCategory, onPress = () => {} }) => (
  <div id="menu-categories-mobile">
    {categories.map((cat) => {
      const active = cat?.id === selectedCategory?.id ? " active" : "";

      return (
        <a
          key={cat?.id}
          id={cat?.id}
          className={`category-button${active}`}
          href={`#menu-main-${cat?.id}`}
          onClick={() => onPress(cat)}
        >
          {cat?.title}
        </a>
      );
    })}
  </div>
);

const CategoriesDesktop = ({ categories, selectedCategory, onPress = () => {} }) => (
  <div id="menu-categories-desktop">
    {categories.map((cat) => {
      const active = cat?.id === selectedCategory?.id ? " active" : "";

      return (
        <button key={cat?.id} id={cat?.id} className={`category-button${active}`} onClick={() => onPress(cat)}>
          {cat?.title}
        </button>
      );
    })}
  </div>
);
