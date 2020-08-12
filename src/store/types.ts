import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState, RootAction } from '.';
import { AnyAction } from 'redux';

// Remove when https://github.com/reduxjs/redux-thunk/pull/224 is released.
declare module "redux" {
  function bindActionCreators<M extends ActionCreatorsMapObject<any>>(
    actionCreators: M,
    dispatch: Dispatch
  ): {
    [N in keyof M]: ReturnType<M[N]> extends ThunkAction<any, any, any, any>
      ? (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>>
      : M[N]
  };
}

export type ThunkResult<R> = ThunkAction<R, RootState, null, RootAction>;
export type ThunkDispatchType = ThunkDispatch<RootState, null, AnyAction>;

export interface FetchReturn {
  status: number | null;
  data: any;
}