import { from, of } from "rxjs";
// 引入combineEpics方法
import {
  FETCH_PHOTOS_REQUEST,
  // FETCH_PHOTOS_SUCCESS,
  // FETCH_PHOTOS_FAILURE,
  fetchPhotosSuccessAction,
  fetchPhotosFailureAction,
} from "@store/actions/photos.actions";

import { switchMap, map, filter, catchError } from "rxjs/operators";

import services from "@models/500px";

// @ts-ignore
const photos: Epic<any, any, any, any> = (action$) =>
  action$.pipe(
    filter((action: any) => action.type === FETCH_PHOTOS_REQUEST),
    switchMap(() => {
      return from(services.getPhotos()).pipe(
        map((payload: any) => {
          console.log(payload);
          // @ts-ignore
          return fetchPhotosSuccessAction(Object.values(payload.photos));
        }),
        catchError((error) => of(fetchPhotosFailureAction(error)))
      );
    })
  );

export default photos;
