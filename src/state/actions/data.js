export const CREATE_TABLE = 'CREATE_TABLE'
export function createTable(workspace, name, coords) {
  return {
    type: CREATE_TABLE,
    payload: {
      workspace,
      name,
      coords,
    }
  }
}

export const MOVE_TABLES = 'MOVE_TABLES'
export function moveTables(workspace, indexes, delta) {
  return {
    type: MOVE_TABLES,
    payload: {
      workspace,
      indexes,
      delta,
    }
  }
}
