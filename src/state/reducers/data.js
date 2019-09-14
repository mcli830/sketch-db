import { CREATE_TABLE, createTable } from '../actions/data'

export default function(state = [
  {
    name: 'Workspace',
    viewBox: {
      x: 0,
      y: 0,
      w: 900,
      h: 600
    },
    tables: []
  }
], action){
  switch (action.type){
    case CREATE_TABLE:
      const { workspace, name, coords } = action.payload;
      const newState = [...state]
      state[workspace].tables.push({
        name,
        coords,
        fields: [ { name: 'id', type: 'ID'} ],
      })
      return newState;
    default: return state;
  }
}
