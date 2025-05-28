import createImageUrlBuilder from "@sanity/image-url";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: "j5a0ndtr",
  dataset: "production",
});

export const urlFor = (source) => {
  return builder.image(source);
};
