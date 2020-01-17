import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { BasicGood } from './data.d';
import * as srv from './service';

export interface StateType {
  basicGoods: BasicGood[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    querySysMenuSetting: Effect;
  };
  reducers: {
    saveSysMenuSetting: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'menuSetting',

  state: {
    basicGoods: [],
  },

  effects: {
    *querySysMenuSetting(_, { call, put }) {
      const response = yield call(srv.sysMenuSetting, 'web');
      yield put({
        type: 'saveSysMenuSetting',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveSysMenuSetting(state, { payload }) {
      return {
        ...state,
        ...{menuGroup:payload},
      };
    },
  },
};

export default Model;
