declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toThousandth: (value: number | string) => string;
  }
}

export {};
