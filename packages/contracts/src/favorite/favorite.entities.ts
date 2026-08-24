import { z } from "zod";
import type {
  favoriteItem,
  favoriteList,
  favoriteState,
} from "./favorite.output";

type FavoriteItem = z.infer<typeof favoriteItem>;
type FavoriteList = z.infer<typeof favoriteList>;
type FavoriteState = z.infer<typeof favoriteState>;

export type { FavoriteItem, FavoriteList, FavoriteState };
