import slugify from 'slugify';
export const getSlug = (name, category, brand) => {
  let slug = name + '-' + category + '-' + brand;
  slug = slugify(slug);
  return slug;
};
