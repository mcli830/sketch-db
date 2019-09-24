import { CREATE_TABLE, MOVE_TABLES } from '../actions/data'

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

  function createTable(){
    const { workspace, name, coords } = action.payload
    const newState = [...state]
    newState[workspace].tables.push(newTable(name, coords))
    return newState
  }

  function moveTables(){
    const { workspace, indexes, delta } = action.payload
    const newState = [...state]
    newState[workspace].tables.forEach((t,i) => {
      if (indexes.includes(i)) {
        t.coords.x += delta.x
        t.coords.y += delta.y
      }
    })
    return newState
  }

  switch (action.type){
    case CREATE_TABLE:
      return createTable()
    case MOVE_TABLES:
      return moveTables()
    default: return state;
  }
}
