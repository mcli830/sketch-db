import { CREATE_TABLE, createTable } from '../actions/data'

export default function(state = [
  {
    name: 'Workspace',
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
