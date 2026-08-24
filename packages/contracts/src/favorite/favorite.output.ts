import { z } from "zod";
import { redListCategoryCode, redListItem } from "../red-list";

const favoriteItem = redListItem.extend({
  followedAt: z.iso.datetime(),
  categoryAtAdd: redListCategoryCode,
  categoryChanged: z.boolean(),
});

const favoriteList = z.strictObject({
  items: z.array(favoriteItem),
  total: z.number().int(),
});

const favoriteState = z.strictObject({
  isFavorite: z.boolean(),
});

export { favoriteItem, favoriteList, favoriteState };
