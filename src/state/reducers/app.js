import {
  CHANGE_MODE, changeMode,
  MOVE_MOUSE, moveMouse,
} from '../actions/app'
import { START_MODE } from '../../vars/ui'

export default function(state = {
  workingspace: 0,
  mode: START_MODE,
  mouse: {
    coords: { x: 0, y: 0 }
  }
}, action){
  switch (action.type){
    case CHANGE_MODE: return {
      ...state,
      mode: action.payload,
    }
    case MOVE_MOUSE: return {
      ...state,
      mouse: {
        ...state.mouse,
        coords: action.payload
      }
    }
    default: return state;
  }
}
