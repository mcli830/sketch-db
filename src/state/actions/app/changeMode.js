export const CHANGE_MODE = 'CHANGE_MODE'

export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    payload: mode
  }
}

export default changeMode
