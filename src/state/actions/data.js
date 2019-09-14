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
