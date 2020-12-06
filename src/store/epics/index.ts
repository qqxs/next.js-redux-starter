import { combineEpics } from "redux-observable";
// 异步加载数据
import photos from "./photos.epics";
import * as ping from "./ping.epics";

// combineEpics会将参数中的epic函数合并在一起
export default combineEpics(photos, ping.pingEpic, ping.pongEpic);
