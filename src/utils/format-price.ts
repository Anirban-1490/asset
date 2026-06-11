export const formatPrice = (value: number) => {
  if (value >= 10000000) {
    const formattedValue = (value / 10000000).toFixed(1).replace(/\.0$/, "");
    return `₹${formattedValue} Cr`;
  }

  if (value >= 100000) {
    const formattedValue = (value / 100000).toFixed(1).replace(/\.0$/, "");
    return `₹${formattedValue} L`;
  }
};
