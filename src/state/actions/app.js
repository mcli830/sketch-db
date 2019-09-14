export const CHANGE_MODE = 'CHANGE_MODE'
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    payload: mode
  }
}

export const MOVE_MOUSE = 'MOVE_MOUSE'
export function moveMouse(coords) {
  return {
    type: MOVE_MOUSE,
    payload: coords
  }
}
