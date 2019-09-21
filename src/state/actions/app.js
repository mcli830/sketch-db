export const CHANGE_THEME = 'CHANGE_THEME'
export function changeTheme(theme) {
  return {
    type: CHANGE_THEME,
    payload: theme
  }
}

export const CHANGE_MODE = 'CHANGE_MODE'
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    payload: mode
  }
}

export const CREATING_TABLE = 'CREATING_TABLE'
export function creatingTable(coords) {
  return {
    type: CREATING_TABLE,
    payload: coords
  }
}
