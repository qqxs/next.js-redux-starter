import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers/reducers";

let store: ReduxStore.StoreState | undefined;

const NODE_ENV = process.env.NODE_ENV;

function initStore(initialState: any) {
  const middlewares =
    NODE_ENV === "development"
      ? composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
      : applyMiddleware(thunkMiddleware);

  return createStore(reducers, initialState, middlewares);
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      // @ts-ignore
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  // @ts-ignore
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
