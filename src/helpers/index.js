import imagePlaceholder from "assets/image_placeholder.jpg";

const getCover = (categoryTitle, image) => {
  if (categoryTitle && image) {
    return `images/${categoryTitle}/${image}`;
  }

  return imagePlaceholder;
};

export { getCover };
