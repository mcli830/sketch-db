import {
  CHANGE_THEME,
  CHANGE_MODE,
  CREATING_TABLE
} from '../actions/app'
import { STARTUP } from '../../vars/ui'

export default function(state = {
  theme: STARTUP.theme,
  workingspace: 0,
  mode: STARTUP.mode,
  coords: { client: {x:0,y:0}, page: {x:0,y:0}},
}, action){
  switch (action.type){
    case CHANGE_THEME: return {
      ...state,
      theme: action.payload,
    }
    case CHANGE_MODE: return {
      ...state,
      mode: action.payload,
    }
    case CREATING_TABLE: return {
      ...state,
      mode: 'creating',
      coords: action.payload,
    }
    default: return state;
  }
}
