export const dateFormate = (dataInput) => {
  const d = new Date(dataInput);
  const date = d?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return date;
};
