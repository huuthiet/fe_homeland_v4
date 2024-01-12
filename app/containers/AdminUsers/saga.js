import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_ADMIN_USERS,
  DELETE_ADMIN_USER,
  UPDATE_ADMIN_USER,
  RESET_PW_ADMIN_USER,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getAdminUsersSuccess,
  getAdminUsersFail,
  deleteAdminUserSuccess,
  deleteAdminUserFail,
  getAdminUsers,
  postUpdateUserSuccess,
  resetPWAdminUserSuccess,
  resetPWAdminUserFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
// import { take, call, put, select } from 'redux-saga/effects';
export function* apiGetAdminUsers() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.adminUser;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getAdminUsersSuccess(response.data.data));
  } catch (error) {
    yield put(getAdminUsersFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeteteAdminUser(payload) {
  const { userId, reason } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.adminUser}?userId=${userId}`;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteAdminUserSuccess(response.data.data));
    yield put(getAdminUsers());
  } catch (error) {
    yield put(deleteAdminUserFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiResetPWAdminUser(payload) {
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.getResetPassWord + payload.userId;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(resetPWAdminUserSuccess(response.data.data));
    yield put(getAdminUsers());
  } catch (error) {
    yield put(resetPWAdminUserFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export function* apiUpdateWallUser(payload) {
  const { userId, wallet } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.updateWallet;

  const data = {
    userId,
    wallet,
  };

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, data);
    yield put(postUpdateUserSuccess(response.data.data));
  } catch (error) {
    yield put(deleteAdminUserFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* adminUsersSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ADMIN_USERS, apiGetAdminUsers);
  yield takeLatest(DELETE_ADMIN_USER, apiDeteteAdminUser);
  yield takeLatest(RESET_PW_ADMIN_USER, apiResetPWAdminUser);
  yield takeLatest(UPDATE_ADMIN_USER, apiUpdateWallUser);
}
