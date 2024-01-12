import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_MOTEL, POST_FLOOR } from './constants';
import { urlLink } from '../../helper/route';
import {
  getMotelSuccess,
  getMotelFail,
  postFloorSuccess,
  postFloorFail,
  getMotel,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotel(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    // console.log(response.data.data.images[0]);
    yield put(getMotelSuccess(response.data.data));
  } catch (error) {
    yield put(getMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostFloor(payload) {
  const { id, formData } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.createFloor;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, formData);
    yield put(postFloorSuccess(response.data.data));
    yield put(getMotel(id));
  } catch (error) {
    yield put(postFloorFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* motelSaga() {
  yield takeLatest(GET_MOTEL, apiGetMotel);
  yield takeLatest(POST_FLOOR, apiPostFloor);
}
