export const toThousandth = (num: number | string) => {
  const reg = /(\d)(?=(?:\d{3})+$)/g;
  return num.toString().replace(reg, '$1,');
};
