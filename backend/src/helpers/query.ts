export const greaterThan = (param: string, value: number) => ({
  [param]: {
    gt: value,
  },
});
