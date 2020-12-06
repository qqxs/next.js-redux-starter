import { ReduxStore } from "src/@types/store";

import { PING, PONG } from "@store/actions/ping.actions";

const pingReducer = (
  state = { isPinging: false },
  { type, payload }: ReduxStore.ReduxAction<boolean>
) => {
  switch (type) {
    case PING:
      return { isPinging: payload };
    case PONG:
      return { isPinging: payload };

    default:
      return state;
  }
};

export default pingReducer;
