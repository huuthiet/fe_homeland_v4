import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import {
    GET_LIST_DEVICE_ENERGY,
    GET_LIST_DEVICE_ENERGY_SUCCESS,
    GET_LIST_DEVICE_ENERGY_FAIL,
    CHANGE_STORE_DATA,
  } from './constants';
import { urlLink } from '../../helper/route';
import {
    getListDeviceEnergy,
    getListDeviceEnergyFail,
    getListDeviceEnergySuccess,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetListDeviceEnergy(payload) {
  const { id } = payload;
//   const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;
    const requestUrl = `http://localhost:5502/api/v1/homeKey/energy/devices`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getListDeviceEnergySuccess(response.data));
  } catch (error) {
    yield put(getListDeviceEnergyFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* jobDetailSaga() {
    yield takeLatest(GET_LIST_DEVICE_ENERGY, apiGetListDeviceEnergy);
  }