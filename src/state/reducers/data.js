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
    const nextState = [...state]
    nextState[workspace].tables.push(newTable(name, coords))
    return nextState
  }

  function moveTables(){
    const { workspace, indexes, offset } = action.payload
    const nextState = [...state]
    nextState[workspace].tables.forEach((t,i) => {
      if (indexes.includes(i)) {
        t.coords = {
          x: t.coords.x + offset.x,
          y: t.coords.y + offset.y,
        }
      }
    })
    return nextState
  }

  switch (action.type){
    case CREATE_TABLE:
      return createTable()
    case MOVE_TABLES:
      return moveTables()
    default: return state;
  }
}
