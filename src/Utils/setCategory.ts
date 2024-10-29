export const setCategory = (key: number) => {
  switch (key) {
    case 0:
      return "Software";
    case 1:
      return "Design";
    case 2:
      return "Operation";

    default:
      return "";
  }
};
