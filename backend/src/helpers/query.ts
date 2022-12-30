import { DEFAULT_LIMIT, MAX_LIMIT } from "../constants/query";

export const parseBoolean = (value?: string) => {
  if (!value) return undefined;

  return Boolean(value);
};

export const parseOrderBy = (
  orderBy: string | undefined,
  defaultParam?: string
) => {
  if (!orderBy) return defaultParam;

  return orderBy;
};

export const parseOrder = (
  order: string | undefined,
  defaultOrder: "asc" | "desc" = "asc"
) => {
  if (!order) return defaultOrder;

  if (order.toLowerCase() === "desc") return "desc";

  return "asc";
};

export const parsePage = (page: string | undefined) => {
  if (!page || isNaN(parseInt(page))) return 1;

  return Math.max(1, parseInt(page));
};

export const parseLimit = (limit: string | undefined) => {
  if (!limit || isNaN(parseInt(limit))) return DEFAULT_LIMIT;

  return Math.min(Math.max(0, parseInt(limit)), MAX_LIMIT);
};

export const calculateOffset = (page: number, limit: number) =>
  (page - 1) * limit;

export const greaterThan = (param: string, value: number) => ({
  [param]: {
    gt: value,
  },
});
