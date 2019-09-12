export const MOVE_MOUSE = 'MOVE_MOUSE'

export function moveMouse(coords) {
  return {
    type: MOVE_MOUSE,
    payload: coords
  }
}

export default moveMouse
