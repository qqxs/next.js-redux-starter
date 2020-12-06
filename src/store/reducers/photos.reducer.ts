import { ReduxStore } from "src/@types/store";

import { FETCH_PHOTOS_SUCCESS } from "@store/actions/photos.actions";

const pingReducer = (
  state = { photos: [] },
  { type, payload }: ReduxStore.ReduxAction<ReduxStore.Photos[]>
) => {
  switch (type) {
    case FETCH_PHOTOS_SUCCESS:
      return payload;
    default:
      return state;
  }
};

export default pingReducer;
