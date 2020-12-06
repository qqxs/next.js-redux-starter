import { AnyAction } from "redux";

declare namespace ReduxStore {
  export interface ReduxAction<T> extends AnyAction {
    payload?: T;
  }

  // all store state
  export interface StoreState {
    counter: number;
    photos: Photos[];
  }

  //
  export interface Photos {
    aperture: string;
    category: string;
    camera: string;
    created_at: string;
    description: string;
    feature: string;
    user: {
      id: number;
      country: string;
      username: string;
      userpic_url: string;
    };
  }
}
