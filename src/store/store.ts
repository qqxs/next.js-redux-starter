import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import reducers from "./reducers/reducers";
import Epic from "./epics/index";
import { ReduxStore } from "src/@types/store";

let store: ReduxStore.StoreState | undefined;

const NODE_ENV = process.env.NODE_ENV;

function initStore(initialState: ReduxStore.StoreState) {
  // 执行 `redux-observable`的 `createEpicMiddleware` 生成redux 中间件
  const epicMiddleware = createEpicMiddleware();

  const middlewares =
    NODE_ENV === "development"
      ? composeWithDevTools(applyMiddleware(epicMiddleware, logger))
      : applyMiddleware(epicMiddleware);

  // @ts-ignore
  const store = createStore(reducers, initialState, middlewares);
  // run
  epicMiddleware.run(Epic);

  return store;
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
