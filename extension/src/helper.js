export const getColorForAge = (days) => {
  if (days > 14) {
    return "red";
  } else if (days > 7) {
    return "orange";
  } else {
    return "green";
  }
};
