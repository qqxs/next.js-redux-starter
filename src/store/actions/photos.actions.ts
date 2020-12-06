import { ReduxStore } from "src/@types/store";

/**
 * photos action types
 */
export const FETCH_PHOTOS_REQUEST = "FETCH_PHOTOS_REQUEST";
export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
export const FETCH_PHOTOS_FAILURE = "FETCH_PHOTOS_FAILURE";

/**
 * fetch photos actions
 */
export function fetchPhotosAction() {
  return {
    type: FETCH_PHOTOS_REQUEST,
    payload: null,
  };
}

/**
 * fetch photos actions success
 */
export function fetchPhotosSuccessAction(photos: ReduxStore.Photos[]) {
  return {
    type: FETCH_PHOTOS_SUCCESS,
    payload: photos,
  };
}
/**
 * fetch photos actions failure
 */
export function fetchPhotosFailureAction(error: Error) {
  return {
    type: FETCH_PHOTOS_FAILURE,
    // payload: null,
  };
}
