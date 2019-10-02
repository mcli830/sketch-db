import {
  CHANGE_THEME,
  CHANGE_MODE,
  CREATING_TABLE,
  NEW_SELECTION,
} from '../actions/app'
import { MODE, STARTUP } from '../../vars/data'

export default function(state = {
  theme: STARTUP.theme,
  workingspace: 0,
  mode: STARTUP.mode,
  selection: [],
  coords: { client: {x:0,y:0}, page: {x:0,y:0}},
}, action){

  function newSelection(){
    const selection = action.payload.filter(index => {
      state.data[state.app.workingspace].tables.map((t,i) => i).includes(index);
    })
    console.log(selection)
    return {
      ...state,
      selection,
    }
  }

  switch (action.type){
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      }
    case CREATING_TABLE:
      return {
        ...state,
        mode: MODE.createTable,
        coords: action.payload,
      }
    case NEW_SELECTION:
      return newSelection()
    default:
      return state;
  }
}
