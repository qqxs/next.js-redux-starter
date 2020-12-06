// 引入combineEpics方法
import { Epic } from "redux-observable";
import { filter, delay, mapTo } from "rxjs/operators";

import {
  PING,
  PONG,
  pingAction,
  pongAction,
} from "@store/actions/ping.actions";

export const pingEpic: Epic<any, any, any, any> = (action$) =>
  action$.pipe(
    filter((action) => action.type === PING),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo(pongAction())
  );

export const pongEpic: Epic<any, any, any, any> = (action$) =>
  action$.pipe(
    filter((action) => action.type === PONG),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo(pingAction())
  );

export default pingEpic;
