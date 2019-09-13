import { CHANGE_MODE, changeMode } from '../actions/app/changeMode'
import { MOVE_MOUSE, moveMouse } from '../actions/app/moveMouse'

export default function(state = {
  mode: 'view',
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
