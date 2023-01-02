import { ICollection } from "../Types/collection";
import Api from "../Utils/api";

export const createCollection = async (
  name: string
): Promise<{ collection: ICollection }> => {
  return Api.post("/collections", { name });
};
