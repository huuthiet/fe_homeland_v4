import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHostMotelRoomDomain = state => state.hostMotelRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HostMotelRoom
 */

const makeSelectHostMotelRoom = () =>
  createSelector(
    selectHostMotelRoomDomain,
    substate => substate,
  );

export default makeSelectHostMotelRoom;
export { selectHostMotelRoomDomain };
