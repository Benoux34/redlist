import { favoriteList, favoriteState } from "@app/contracts";
import type { FavoriteList, FavoriteState } from "@app/contracts";
import { apiGet, apiRequest } from "../client";

function favoritesRequest(): Promise<FavoriteList> {
  return apiGet("/api/favorites", favoriteList);
}

function favoriteStateRequest(id: number): Promise<FavoriteState> {
  return apiGet(`/api/favorites/${id}`, favoriteState);
}

function addFavoriteRequest(id: number): Promise<FavoriteState> {
  return apiRequest(`/api/favorites/${id}`, favoriteState, "PUT");
}

function removeFavoriteRequest(id: number): Promise<FavoriteState> {
  return apiRequest(`/api/favorites/${id}`, favoriteState, "DELETE");
}

export {
  favoritesRequest,
  favoriteStateRequest,
  addFavoriteRequest,
  removeFavoriteRequest,
};
