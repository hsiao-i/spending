import type { ComputedRef } from 'vue';

export const toThousandth = (num: number | string | ComputedRef<number>) => {
  const reg = /(\d)(?=(?:\d{3})+$)/g;
  return num.toString().replace(reg, '$1,');
};
