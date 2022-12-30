export interface IPagination {
  offset?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
}
