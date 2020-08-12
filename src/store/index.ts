import { StateType } from 'typesafe-actions';
import rootReducer from './root-reducer';
import * as flagActions from './flags/actions';
import { FlagsAction } from './flags/types';
import * as authActions from './auth/actions';
import { AuthAction } from './auth/types';
import * as adventuresActions from './adventures/actions';
import { AdventuresAction } from './adventures/types';


export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const actions = {
  flags: flagActions,
  auth: authActions,
  adventures: adventuresActions,
};

export * from './types';
export * from './flags/types';
export * from './auth/types';
export * from './adventures/types';

export type RootAction = FlagsAction | AuthAction | AdventuresAction; 
export type RootState = StateType<typeof rootReducer>;