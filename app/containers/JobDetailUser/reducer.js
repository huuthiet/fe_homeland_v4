/*
 *
 * JobDetail reducer
 *
 */
import produce from 'immer';
import { GET_PROFILE_SUCCESS } from '../Profile/constants';
import {
  CHANGE_STORE_DATA,
  GET_JOB_FAIL,
  GET_JOB_SUCCESS,
  PUT_JOB_FAIL,
  PUT_DEPOSIT_FAIL,
  PUT_DEPOSIT_SUCCESS,
} from './constants';

export const initialState = {
  profile: {},
  job: {},
  jobErrors: 0,
  flagDeposit: false,
};

/* eslint-disable default-case, no-param-reassign */
const jobDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_JOB_SUCCESS:
        draft.job = action.response;
        break;
      case GET_JOB_FAIL:
        draft.job = action.error.errors;
        break;
      case PUT_DEPOSIT_FAIL:
        draft.flagDeposit = true;
        break;
      case PUT_DEPOSIT_SUCCESS:
        draft.flagDeposit = false;
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case PUT_JOB_FAIL:
        draft.jobErrors = 1;
        alert(action.error.errorMessage);
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default jobDetailReducer;
