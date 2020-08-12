import { combineReducers } from 'redux';
import flags from './flags/reducer';
import auth from './auth/reducer';
import adventures from './adventures/reducer'

const rootReducer = combineReducers({
  flags,
  auth,
  adventures,
});

export default rootReducer;