import {
  CHANGE_MODE,
  CREATING_TABLE
} from '../actions/app'
import { START_MODE } from '../../vars/ui'

export default function(state = {
  workingspace: 0,
  mode: START_MODE,
  coords: { client: {x:0,y:0}, page: {x:0,y:0}},
}, action){
  switch (action.type){
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
