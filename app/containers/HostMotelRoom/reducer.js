/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { GET_LIST_ROOM_SUCCESS, GET_LIST_ROOM_FAIL } from './constants';
import Money from '../App/format';
export const initialState = {
  listRoom: [],
  action1: 0,
};

/* eslint-disable default-case, no-param-reassign */
const hostMotelRoomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROOM_SUCCESS:
        for (let index = 0; index < action.response.length; index++) {
          const element = action.response[index];
          element.key = index + 1;
          element.addressFull = element.address.address;
          element.hostName = `${element.owner.lastName} ${
            element.owner.firstName
          }`;
          element.sumOrder = 0;
          const orderDataArrDataArr = element.dataPayment.data;
          let sumOrder = 0;
          for (let indexJ = 0; indexJ < orderDataArrDataArr.length; indexJ++) {
            const orderDataArrData = orderDataArrDataArr[indexJ].orderData;
            for (let indexI = 0; indexI < orderDataArrData.length; indexI++) {
              const elementOrderData = orderDataArrData[indexI];
              if (elementOrderData.isCompleted) {
                sumOrder += elementOrderData.amount;
              }
            }
            element.sumOrder = Money(sumOrder);
          }
        }
        draft.listRoom = action.response;
        draft.action1 = 1;
        break;
      case GET_LIST_ROOM_FAIL:
        draft.listRoom = action.error;
        break;
    }
  });

export default hostMotelRoomReducer;
