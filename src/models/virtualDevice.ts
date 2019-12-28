// import { Device } from '@/services/resources/models';

const virtualDevice = {
  namespace: 'VirtualDevice',

  state: {
    devices: [],
    visible: false,
  },

  effects: {
    // *connect({ payload }, { call, put }) {
    //   const device = payload as Device;
    // },
    // *show(_, { put }) {
    //   yield put({
    //     type: 'save',
    //     payload: { visible: true },
    //   });
    // },
    // *cancel(_, { put }) {
    //   yield put({
    //     type: 'save',
    //     payload: { visible: false },
    //   });
    // },
  },
  reducers: {
    // save(state, { payload }) {
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    // },
  },
};

export default virtualDevice;
