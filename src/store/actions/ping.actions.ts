/**
 * Action types
 */
/**@value `PING` */
export const PING = "PING";
/**@value `PONG` */
export const PONG = "PONG";

/**
 * Actions
 */
export function pingAction() {
  return {
    type: PING,
    payload: true,
  };
}

export function pongAction() {
  return {
    type: PONG,
    payload: false,
  };
}
