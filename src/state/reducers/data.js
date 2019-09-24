import { CREATE_TABLE } from '../actions/data'

function newTable(name, coords){
  return {
    name,
    coords,
    fields: [ { name: 'id', type: 'ID' } ],
  }
}

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
      state[workspace].tables.push(newTable(name, coords))
      return newState;
    default: return state;
  }
}
