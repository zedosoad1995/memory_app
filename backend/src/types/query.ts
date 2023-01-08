export interface IPagination {
  offset?: number;
  limit?: number;
  order?: Record<string, "asc" | "desc" | undefined>;
}
