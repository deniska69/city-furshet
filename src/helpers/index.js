import imagePlaceholder from "assets/image_placeholder.jpg";

const getCover = (categoryTitle, image) =>
  import.meta.env.DEV ? imagePlaceholder : `images/${categoryTitle}/${image}`;

export { getCover };
